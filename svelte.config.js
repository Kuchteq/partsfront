import path from 'path';
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			env: {
				host: '127.0.0.1',
				port: '6000'
			}
		}),
		files: {
			assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$shared: path.resolve('./src/shared'),
					$icons: path.resolve('./src/icons'),
					$axios: path.resolve('./config/axios-config'),
					$functions: path.resolve('./src/functions')
				}
			}
		}
	},
	preprocess: sveltePreprocess()
};

export default config;
