


export default class NotesView {

  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `


    <div  class="menus__sidebar flex h-full bg-slate-900">
      <button id="buton"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
</svg> </button>
    </div>

            <div id="addHidden" class="notes__sidebar hidden   space-y-4">
               
                <button class="notes__add font-bold rounded-lg w-full h-20 bg-green-600 hover:bg-green-700 hover:text-white" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>



          
            
            <div class="notes__preview">

            <input class="notes__title text-slate-200 px-2 pt-1 truncate bg-slate-900 rounded-md" type="text" placeholder="Add title...">
                <textarea class="notes__body  text-slate-100 font-thin p-3 bg-slate-900 rounded-md">Take Note...</textarea>
            </div>
        `;



const butons = document.getElementById("buton");
const addHidden = document.getElementById("addHidden")


butons.addEventListener("click", hideAndShow);

function hideAndShow () {


  
addHidden.classList.remove("hidden" );
// addHidden.classList.remove("hidden");

}


    const btnAddNote = this.root.querySelector(".notes__add");
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");

    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
            <div class="notes__list-item border shadow border-green-700 rounded-lg text-slate-200 my-4" data-note-id="${id}">
                <div class="text-xl truncate p-2">${title}</div>
                <div class="notes__small-body p-1 truncate text-xs ">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated  text-slate-400 font-thin text-sm text-right">
                    ${updated.toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                </div>
            </div>
        `;
  }

  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes__list");

    // Empty list
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

    // Add select/delete events for each list item
    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm(
            "Are you sure you want to delete this note?"
          );

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    this.root.querySelectorAll(".notes__list-item").forEach((noteListItem) => {
      noteListItem.classList.remove("notes__list-item--selected");
    });

    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
