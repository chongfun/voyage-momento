import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
	site: 'https://voyagemomento.com',
	integrations: [
		starlight({
			title: 'Voyage Momento',
			logo: {
				src: './src/assets/logo-128x128.png',
			},
			favicon: '/favicon.ico',
			head: [
			  {
				tag: 'link',
				attrs: {
				  rel: 'apple-touch-icon',
				  type: 'image/png',
				  href: '/apple-touch-icon.png',
				  sizes: '180x180',
				},
			  },
			  {
				tag: 'link',
				attrs: {
				  rel: 'icon',
				  type: 'image/png',
				  href: '/favicon-32x32.png',
				  sizes: '32x32',
				},
			  },
			  {
				tag: 'link',
				attrs: {
				  rel: 'icon',
				  type: 'image/png',
				  href: '/favicon-16x16.png',
				  sizes: '16x16',
				},
			  },
			  {
				tag: 'link',
				attrs: {
				  rel: 'manifest',
				  href: '/site.webmanifest',
				},
			  },
			  {
				tag: 'script',
				attrs: {
				  src: 'https://www.googletagmanager.com/gtag/js?id=G-4JSTJYBDHH',
				  async: true,
				  type: "text/partytown"
				},
			  },
			  {
				tag: 'script',
				attrs: { type: "text/partytown" },
				content: "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-4JSTJYBDHH');"
			  },
			],
			sidebar: [
				{
					label: 'Inventory',
					items: ['inventory/axes', 'inventory/bows', 'inventory/spears', 'inventory/staffs', 'inventory/swords', 'inventory/trinkets', 'inventory/tarot-whispers'],
				},
				{
					label: 'Guides',
					items: ['guides/weaponry_trial_1', 'guides/weaponry_trial_2', 'guides/weaponry_trial_3', 'guides/tarot_whisper_1', 'guides/tarot_whisper_2', 'guides/tarot_whisper_3', 'guides/engraving', 'guides/talent_priority', 'guides/shop_priority'],
				},
				{
					label: 'Characters',
					autogenerate: { directory: 'characters' },
				}
			],
			customCss: ['./src/tailwind.css','./src/styles/custom.css'],
			components: {
				PageTitle: './src/components/PageTitle.astro',
			},
		}),
		tailwind({ applyBaseStyles: false }),
		partytown({
            config: {
              forward: ["dataLayer.push"],
            },
        }),
	],
});
