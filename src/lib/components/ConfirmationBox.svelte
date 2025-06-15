<script>
	export let message = 'Are you sure you want to delete this item?';
	export let onConfirm = () => {};
	export let onCancel = () => {};
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
	<div class="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 text-center shadow-lg">
		<h2 class="text-lg font-semibold text-gray-800">{message}</h2>
		<div class="flex justify-center gap-4">
			<button
				class="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
				on:click={onConfirm}
			>
				Yes, Delete
			</button>
			<button
				class="rounded-xl bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
				on:click={onCancel}
			>
				Cancel
			</button>
		</div>
	</div>
</div>
