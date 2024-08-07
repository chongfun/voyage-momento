import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: ({ image }) => {
        return z.object({
          titleImage: image().optional(),
		  titleImageAlt: z.string().optional(),
		  rarity: z.string().optional(),
		  role: z.string().optional(),
        });
      },
    }),
  }),
};
