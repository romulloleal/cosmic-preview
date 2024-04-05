import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			devOptions: { enabled: true },
			registerType: 'autoUpdate',
			// add this to cache all the imports
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
			},
			// add this to cache all the
			// static assets in the public folder
			includeAssets: ['**/*'],
			manifest: {
				theme_color: '#101010',
				background_color: '#101010',
				display: 'fullscreen',
				scope: '/',
				start_url: '/',
				name: 'Cosmic',
				short_name: 'Cosmic',
				icons: [
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: '/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0',
		port: 3001,
	},
});
