import { writable } from 'svelte/store';

export const isLoading = writable(false);
export const deleteConferm = writable(false);
export const deleteItemId = writable(false);
