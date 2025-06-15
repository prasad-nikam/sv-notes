<script>
	import { currentTheme, themes } from '$lib/stores/theme';
	import { get } from 'svelte/store';

	const themeNames = Object.keys(themes);

	function changeTheme(e) {
		currentTheme.set(e.target.value);
	}
</script>

<select
	on:change={changeTheme}
	class="rounded border bg-white px-2 py-1 text-sm text-gray-700 shadow"
>
	{#each themeNames as name}
		<option value={name} selected={name === $currentTheme}>
			{name}
		</option>
	{/each}
</select>
