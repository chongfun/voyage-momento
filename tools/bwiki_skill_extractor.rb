require 'nokogiri'
require 'open-uri'

character = ARGV[0]
url = ARGV[1]

title = character.chars.tap { |a| a.first.upcase! }.join

html_content = URI.open(url)
doc = Nokogiri::HTML(html_content)

def extract_skills(nodes)
  skill_image_regex = Regexp.new(/\s(https.+\.png)\s2x/)
  link_urls = nodes
  skill_links = link_urls.each_slice(3).map { |urls| urls[1] }

  skill_links.reverse_each.map do |node|
    output = {
      name: node['title'].split('/').last,
      url: 'https://wiki.biligame.com' + node['href'],
      image_url: node.children.first['srcset'].match(skill_image_regex)[1]
    }
  end
end

def download_skill_images(character, side, skills)
  skills.each_with_index do |skill, index|
    image_data = URI.open(skill[:image_url]).read
    file_extension = File.extname(URI.parse(skill[:image_url]).path)
    file_name = "#{character}_#{side}_#{index + 1}#{file_extension}"

    File.open(file_name, 'wb') do |file|
      file.write(image_data)
    end
  end
end

left_skills = extract_skills(doc.css('td.wn_s_bg_l div.skill_icon_box a'))
right_skills = extract_skills(doc.css('td.wn_s_bg_r div.skill_icon_box a'))

rarity = case left_skills.count
when 6
  "Legendary"
when 5
  "Epic"
when 4
  "Rare"
else
  "Common"
end

# some mdx
mdx = <<~EOF
---
title: #{title}
description: Sword of Convallaria #{title} Build
titleImage: '../../../assets/characters/#{character}/sprite.png'
titleImageAlt: #{title}
rarity: #{rarity}
role: 
---
import { Badge } from '@astrojs/starlight/components';
import { Image } from 'astro:assets';
import SkillBuildGrid from '../../../components/SkillBuildGrid.astro';
import HorizontalCard from '../../../components/HorizontalCard.astro';
EOF

left_skills.each_with_index do |skill, index|
  skill_number = index + 1
  mdx << "import skill_l#{skill_number} from '../../../assets/skills/#{character}_left_#{skill_number}.png';\n"
end

right_skills.each_with_index do |skill, index|
  skill_number = index + 1
  mdx << "import skill_r#{skill_number} from '../../../assets/skills/#{character}_right_#{skill_number}.png';\n"
end

mdx << "\n## Skills\n"

mdx << "\n<SkillBuildGrid grid=\"grid-cols-#{left_skills.count}\">\n"

left_skills.each_with_index do |skill, index|
  mdx << <<~EOF
    <a href="#{skill[:url]}" target="_blank" rel="noopener noreferrer">
        <Image src={skill_l#{index + 1}} alt="#{skill[:name]}" width="100" class="rounded-full" />
    </a>
EOF
end

right_skills.each_with_index do |skill, index|
  mdx << <<~EOF
    <a href="#{skill[:url]}" target="_blank" rel="noopener noreferrer">
        <Image src={skill_r#{index + 1}} alt="#{skill[:name]}" width="100" class="rounded-full" />
    </a>
EOF
end

mdx << <<~EOF
</SkillBuildGrid>
---
<Badge text="Optional" variant="note" />
<Badge text="Recommended" variant="danger" />
<Badge text="Castalia" variant="caution" />

## Tarot Whispers

## References
- [#{doc.css('title').children.first.to_s}](#{url})
- [为这和平的世界wiki|GameKee]()
EOF

# write output
Dir.chdir("../src/assets/skills") do
  download_skill_images(character, "left", left_skills)
  download_skill_images(character, "right", right_skills)
end

Dir.chdir("../src/content/docs/characters") do
  File.open("#{character}.mdx", 'wb') do |file|
    file.write(mdx)
  end
end
