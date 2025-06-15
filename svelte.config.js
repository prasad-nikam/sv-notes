import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess as vitePreprocess } from 'svelte-preprocess';

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		})
	}
};
