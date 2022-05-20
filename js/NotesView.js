export default class NotesView {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteAdd = onNoteAdd;
    this.onNoteDelete = onNoteDelete;
    this.onNoteSelect = onNoteSelect;
    this.onNoteEdit = onNoteEdit;
    this.root.innerHTML = `

          <div class="notes__sidebar">
            <button class="notes__add" type="button">Add Note</button>
            <div class="notes__list">

             
            </div>
        </div>
        <div class="notes__preview">
            <input type="text" class="notes__title" placeholder="Enter a title">
            <textarea class="notes__body" name="" id="" cols="30" rows="10">TAKE NOTE</textarea>
        </div>
        
        `;

    const btnAddNote = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inputTitle.value.trim();
        const updatedBody = inputBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });







    // todo hide the note preview
    this.updateNotePreviewVisibility(false);


 
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `

        <div class="notes__list-item" data-note-id="${id}"> 
        <div class="notes__small-title"> ${title} </div>
        <div class="notes__small-body"> ${body.substring(0, MAX_BODY_LENGTH)} 
            ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notes__small-updated"> ${updated.toLocaleString(undefined, {
          dateStyle: "full",
          timeStyle: "short",
        })} </div>

        </div>

      
      `;
  }

  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes__list");

    notesListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // add select delete events for eact list item

    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });
        noteListItem.addEventListener("dbclick", () => {
            const doDelete = confirm("Are u sure?");

            if (doDelete) {
                this.onNoteDelete(noteListItem.dataset.noteId)
            }
        })
      });
  }



  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
        noteListItem.classList.remove("notes__list-item--selected");
    });
 
    this.root.querySelector(`.notes__list-item[data-node-id="${note.id}"]`).classList.add("notes__list-item--selected");
  }



  updateNotePreviewVisibility(visible) {
      this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden" ;
  }
}
