import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const themes = {
	light: {
		'--color-bg': 'white',
		'--color-text': 'black'
	},
	dark: {
		'--color-bg': '#1a202c',
		'--color-text': 'white'
	},
	ocean: {
		'--color-bg': '#cee1ff',
		'--color-text': '#e0ffff',
		'--color-secondary': 'gray'
	},
	lavender: {
		'--color-bg': '#e6e6fa',
		'--color-text': '#4b0082'
	}
};

// You can optionally read from localStorage (only in browser)
const defaultTheme = browser ? localStorage.getItem('theme') || 'light' : 'light';

export const currentTheme = writable(defaultTheme);

if (browser) {
	currentTheme.subscribe((themeName) => {
		localStorage.setItem('theme', themeName);

		const themeVars = themes[themeName];
		if (!themeVars) return;

		for (const key in themeVars) {
			document.documentElement.style.setProperty(key, themeVars[key]);
		}
	});
}
