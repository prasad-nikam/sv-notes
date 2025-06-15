<script>
	import { formatDate, formatTime } from '$lib/utility/formatDate';
	import ConfirmationBox from './ConfirmationBox.svelte';
	import DeleteIcon from './DeleteIcon.svelte';
	import EditIcon from './EditIcon.svelte';

	export let note;
	export let deleteNote;
	export let editNote;
	let id = null;
</script>

<div class="rounded-xl border border-gray-200 bg-blue-100 p-5 shadow-md">
	<h2 class="mb-2 text-2xl font-semibold text-gray-800">{note.title}</h2>
	<p class="whitespace-pre-wrap text-gray-600">{note.content}</p>
	<p class="whitespace-pre-wrap text-gray-600">
		{formatDate(note.createdAt) + ' ' + formatTime(note.createdAt)}
	</p>

	<div class="mt-4 flex justify-end gap-4">
		<button
			on:click={() => editNote(note)}
			class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50"
		>
			<EditIcon class="h-4 w-4" />
			<span>Edit</span>
		</button>

		<button
			on:click={() => deleteNote(note.id)}
			class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
		>
			<DeleteIcon class="h-4 w-4" />
			<span>Delete</span>
		</button>
	</div>
</div>
