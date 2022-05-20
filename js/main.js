import App from "./App.js";

const root = document.getElementById("app");

const app = new App(root);

// const view = new NotesView(app, {
//   onNoteAdd() {
//     console.log("note added");
//   },

//   onNoteSelect(id) {
//     console.log("note selected" + id);
//   },

//   onNoteDelete(id) {
//     console.log("deleted" + id);
//   },

//   onNoteEdit(newTitle, newBody) {}
// });

// const notes = NotesAPI.getAllNotes();
// view.updateNoteList(notes)
// view.updateActiveNote(notes[0])
