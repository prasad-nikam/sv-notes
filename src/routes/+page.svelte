<script>
	import { onMount } from 'svelte';
	import { isLoading, deleteConferm, deleteItemId } from '$lib/stores/data';
	import NoteCard from '$lib/components/NoteCard.svelte';

	import { fetchNotes, createNote, updateNote, deleteNote as deleteNoteAPI } from '$lib/api/notes';
	import Spinner from '$lib/components/Spinner.svelte';
	import ConfirmationBox from '$lib/components/ConfirmationBox.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let notes = [];
	let title = '';
	let content = '';
	let editing = null;
	let searchTerm = '';
	let currentPage = 1;
	let limit = 20;

	const loadNotes = async () => {
		isLoading.set(true);
		notes = await fetchNotes(currentPage, limit);
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
		deleteItemId.set(id);
		deleteConferm.set(true);
	};

	const editNote = (note) => {
		title = note.title;
		content = note.content;
		editing = note;
	};

	onMount(loadNotes);
	$: filteredNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	let sortOption = 'newest'; // default sort

	$: sortedNotes = [...filteredNotes].sort((a, b) => {
		if (sortOption === 'az') {
			return a.title.localeCompare(b.title);
		} else if (sortOption === 'za') {
			return b.title.localeCompare(a.title);
		} else if (sortOption === 'oldest') {
			return new Date(a.createdAt) - new Date(b.createdAt);
		} else if (sortOption === 'newest') {
			return new Date(b.createdAt) - new Date(a.createdAt);
		}
		return 0;
	});
</script>

<main class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 md:flex-row">
	<!-- Sidebar (form section) -->
	<aside
		class="w-full border-b border-gray-200 pr-0 md:w-1/3 md:border-b-0 md:border-r md:pr-6 lg:w-1/4"
	>
		<h1 class="mb-6 text-center text-3xl font-bold text-blue-600 md:text-left">📝 Notes App</h1>

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
		<div class="flex justify-start gap-1 p-4">
			change Theme:
			<ThemeSwitcher />
		</div>
	</aside>

	<!-- Notes Section -->
	<section class="flex h-[70vh] flex-1 flex-col md:h-[calc(100vh-4rem)]">
		<!-- Sticky Search Bar -->
		<div class="sticky top-0 z-10 mb-4 rounded-xl bg-white">
			<form>
				<div
					class="flex flex-col items-stretch gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:border-blue-500 sm:flex-row sm:items-center"
				>
					<input
						class="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
						type="text"
						placeholder="Search your notes"
						bind:value={searchTerm}
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

		<div class="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700">
			<label for="sort">Sort by:</label>
			<select
				id="sort"
				bind:value={sortOption}
				class="rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
			>
				<option value="newest">Newest First</option>
				<option value="oldest">Oldest First</option>
				<option value="az">A → Z (Title)</option>
				<option value="za">Z → A (Title)</option>
			</select>
		</div>

		<!-- Notes List -->
		<div class="mt-4 flex-1 overflow-y-auto pr-2">
			{#if $isLoading}
				<div class="flex h-40 items-center justify-center">
					<Spinner />
				</div>
			{:else}
				<div class="space-y-4">
					{#if sortedNotes.length > 0}
						{#each sortedNotes as note (note.id)}
							<NoteCard {note} {deleteNote} {editNote} />
						{/each}
					{:else}
						<p class="text-center text-gray-500">No notes found matching your search.</p>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	{#if $deleteConferm}
		<ConfirmationBox
			message="Do you really want to delete this note?"
			on:confirm={deleteConfirmed}
			on:cancel={cancelDelete}
			{loadNotes}
		/>
	{/if}
</main>
