import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = { 200: '#bccdc9', 600: '#43776e', 900: '#213733', 950: '#192724' };
const gray = { 100: '#f2f8f6', 200: '#e6f0ee', 300: '#b8c5c2', 400: '#78928d', 500: '#465e59', 700: '#263d39', 800: '#152c28', 900: '#111a19' };

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
	plugins: [starlightPlugin()],
};
