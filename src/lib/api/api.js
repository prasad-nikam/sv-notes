let notes = [
	{ id: 1, title: 'First Note', content: 'Hello world!' },
	{ id: 2, title: 'Second Note', content: 'This is a note.' }
];

export const getNotes = () => Promise.resolve([...notes]);

export const createNote = (note) => {
	const newNote = { ...note, id: Date.now() };
	notes.push(newNote);
	return Promise.resolve(newNote);
};

export const updateNote = (id, updatedNote) => {
	notes = notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note));
	return Promise.resolve({ id, ...updatedNote });
};

export const deleteNote = (id) => {
	notes = notes.filter((note) => note.id !== id);
	return Promise.resolve();
};
