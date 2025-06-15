<script>
	import { deleteConferm, deleteItemId } from '$lib/stores/data';
	import { deleteNote } from '$lib/api/notes';

	export let message = 'Are you sure you want to delete this item?';
	export let loadNotes;
	export let onConfirm = async () => {
		deleteConferm.set(false);
		await deleteNote($deleteItemId);
		loadNotes();
	};
	export let onCancel = () => {
		deleteConferm.set(false);
	};
</script>

<!-- Blurred backdrop with centered confirmation modal -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
	<div
		class="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 text-center shadow-xl ring-1 ring-black/10"
	>
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
