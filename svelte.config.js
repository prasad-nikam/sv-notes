// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

export default {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html', // this enables SPA mode
			strict: false // disables dynamic route error
		}),
		prerender: {
			entries: [] // prevents trying to prerender unknown routes
		}
	}
};
