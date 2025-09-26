document.addEventListener('DOMContentLoaded', () => {
  const mysubhead = document.getElementById("greeting");
  const myButton = document.getElementById("name");
  const addNote = document.getElementById("add-note");

  const welcomeaudio = new Audio("music/name.wav");

  function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName || myName.trim() === "") return setUserName(); // re-prompt if empty
    localStorage.setItem("name", myName);
    mysubhead.textContent = `Hi ${myName} 👋, welcome back`;
    welcomeaudio.play();
    myButton.remove();
    document.getElementById("add-note").style.display = "block";
  }

  const storedName = localStorage.getItem("name");
  if (!storedName || storedName === "null") {
    mysubhead.textContent = "Hi there 👋, welcome!";
  } else {
    mysubhead.textContent = `Hi ${storedName} 👋, welcome back`;
    myButton.remove();
  }

  myButton.addEventListener("click", setUserName);
   
});


const notesList = document.getElementById("notes-list");
const titleInput = document.querySelector("#notes-title input");
const contentInput = document.querySelector("#notes-content input");
const saveBtn = document.getElementById("save-note");
const cancelBtn = document.getElementById("cancel-note");
const addNewBtn = document.getElementById("add-new-note");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to render notes
function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.innerHTML = `
      <h4>${note.title}</h4>
      <p>${note.content}</p>
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(noteCard);
  });
}

// Save note
saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title && !content) return;

  notes.push({ title, content });
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
  titleInput.value = '';
  contentInput.value = '';
});

// Cancel note
cancelBtn.addEventListener('click', () => {
  titleInput.value = '';
  contentInput.value = '';
});

// Add New Note
addNewBtn.addEventListener('click', () => {
  titleInput.value = '';
  contentInput.value = '';
  titleInput.focus();
});

// Edit and Delete functions (placeholders)
window.editNote = function(index) {
  const note = notes[index];
  titleInput.value = note.title;
  contentInput.value = note.content;
  // Remove old note for simplicity
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
};

window.deleteNote = function(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
};

// Initial render
renderNotes();
