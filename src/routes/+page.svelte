<script>
	import { onMount } from 'svelte';
	import { isLoading } from '$lib/stores/data';
	import NoteCard from '$lib/components/NoteCard.svelte';

	import { fetchNotes, createNote, updateNote, deleteNote as deleteNoteAPI } from '$lib/api/notes';
	import Spinner from '$lib/components/Spinner.svelte';

	let notes = [];
	let title = '';
	let content = '';
	let editing = null;

	const loadNotes = async () => {
		isLoading.set(true);
		notes = await fetchNotes();
		isLoading.set(false);
	};

	const handleSubmit = async () => {
		const noteData = { title, content };

		if (editing) {
			await updateNote(editing.id, noteData);
			editing = null;
		} else {
			await createNote(noteData);
		}

		title = '';
		content = '';
		loadNotes();
	};

	const deleteNote = async (id) => {
		await deleteNoteAPI(id);
		loadNotes();
	};

	const editNote = (note) => {
		title = note.title;
		content = note.content;
		editing = note;
	};

	onMount(loadNotes);
</script>

<main class="mx-auto flex h-screen w-full max-w-7xl overflow-hidden px-4 py-6 md:gap-8">
	<!-- Aside (fixed, non-scrollable) -->
	<aside class="w-full flex-shrink-0 border-r border-gray-200 pr-6 md:w-1/3 lg:w-1/4">
		<h1 class="mb-8 text-center text-3xl font-bold text-blue-600 md:text-left">📝 Notes App</h1>

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<input
				type="text"
				bind:value={title}
				placeholder="Title"
				class="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none"
				required
			/>

			<textarea
				bind:value={content}
				placeholder="Content"
				class="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none"
				rows="4"
				required
			></textarea>

			<button
				class="w-full rounded-xl bg-blue-500 px-4 py-3 text-white shadow transition hover:bg-blue-700"
			>
				{editing ? 'Update Note' : 'Add Note'}
			</button>
		</form>
	</aside>

	<!-- Notes (scrollable) -->
	<section class="flex flex-1 flex-col overflow-hidden">
		<!-- Sticky search bar -->
		<div class="mb-4 flex-shrink-0 bg-white">
			<form class="">
				<div
					class="flex flex-col items-stretch gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:border-blue-500 sm:flex-row sm:items-center sm:gap-2"
				>
					<input
						class="mx-2 my-2 flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
						type="text"
						placeholder="Search your notes"
					/>
					<button
						class="w-full rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-700 sm:w-auto"
						type="button"
					>
						Search
					</button>
				</div>
			</form>
		</div>

		<!-- Scrollable notes list -->
		<div class="flex-1 overflow-y-auto pr-2">
			{#if $isLoading}
				<div class="flex h-40 items-center justify-center">
					<Spinner />
				</div>
			{:else}
				<div class="space-y-4">
					{#each notes as note (note.id)}
						<NoteCard {note} {deleteNote} {editNote} />
					{/each}
				</div>
			{/if}
		</div>
	</section>
</main>
