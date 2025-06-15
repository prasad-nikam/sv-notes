import { API_URL } from '$lib/constants';

export async function fetchNotes() {
	const res = await fetch(API_URL);
	if (!res.ok) throw new Error('Failed to load notes');
	return await res.json();
}

export async function createNote(note) {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(note)
	});
	if (!res.ok) throw new Error('Failed to create note');
	return await res.json();
}

export async function updateNote(id, note) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(note)
	});
	if (!res.ok) throw new Error('Failed to update note');
	return await res.json();
}

export async function deleteNote(id) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: 'DELETE'
	});
	if (!res.ok) throw new Error('Failed to delete note');
	return true;
}
