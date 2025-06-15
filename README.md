# 🧪 Frontend Internship Take-Home Challenge

## 🧠 Goal

Build a simple web application using **Svelte** and **TailwindCSS** that interacts with a mock API. The app should allow users to **view**, **create**, **update** and **delete** "notes". The design is entirely up to you.

---

## 📄 Feature Requirements

1. **Display Notes**

   - On page load, fetch and display a list of notes from `GET /notes`.
   - Each note has:
     ```json
     {
     	"id": 30,
     	"title": "Water Bottle",
     	"content": "It hydrates you and keeps you healthy",
     	"createdAt": "2025-06-03T11:38:28.192Z"
     }
     ```

2. **Create Note**

   - Provide a form with `title` and `content` fields.
   - On submit, send `POST /notes` with a JSON body and update the list.

3. **Edit Note**

   - Each note should have an "Edit" button.
   - Clicking it allows the user to edit the fields inline or in a modal.
   - On save, send `PUT /api/notes/:id`.

4. **Delete Note**

   - Each note should have a "Delete" button.
   - Clicking it allows the user to delete the note.
   - On delete, send `DELETE /api/notes/:id`.

5. **Responsive Design**
   - The layout should work well on both mobile and desktop.
   - Use TailwindCSS to build a clean, readable, and responsive UI.

---

## 🚀 Optional Features (Nice to Have)

These aren't mandatory, but could be a way to showcase your abilities:

- ✅ Improve the UX feedback on async operations. E.g. show a spinner while waiting for a response and/or perform operations optimistically, reflecting changes before the response comes back.
- Implement pagination, limiting the view to 20 notes per page, or infinite scroll.
- ✅ Sorting of notes
- ✅ Implement a search box, allowing the user to filter notes by title.
- ✅ Implement a confirmation modal for deleting notes.
- ✅ Dark mode (multi theme).

Note that these are not requirements, and you could also ship other features that you think would be interesting, even if they are not part of this document. You are also welcome to deviate from the requirements as long as you provide a reasonable UX/UI justification for your choices.

---
