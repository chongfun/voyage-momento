import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.voyagemomento.com',
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
			],
			sidebar: [
				{
					label: 'Inventory',
					autogenerate: { directory: 'inventory' },
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
	],
});
