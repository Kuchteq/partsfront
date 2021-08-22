import path from 'path';
import sveltePreprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
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
