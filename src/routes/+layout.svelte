<script>
	import '../app.css';
	import { isLoading } from '$lib/stores/data';

	let { children } = $props();
</script>

{@render children()}
