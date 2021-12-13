import React, { Component } from "react";
import NoteAdd from "./components/NoteAdd/NoteAdd";
import Modal from "./components/Modal/Modal";
import NoteList from "./components/NoteList";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      noteId: 0,
      noteName: "",
      noteData: "",
      renderNote: true,
      notesArray: [],
      notesFolders: ["--Unsorted--"],
      visibleFolder: "--Unsorted--",
      showAllFolders: true,
    };
  }

  componentDidMount() {
    this.loadNotesFromLocalStorage();
  }

  loadNotesFromLocalStorage = () => {
    if (localStorage.length !== 0) {
      let arrayWithOldNotes = [];
      Object.keys(localStorage).forEach((key) => {
        let retrievedLocalStObj = localStorage.getItem(key);
        let parsedLocalStObj = JSON.parse(retrievedLocalStObj);
        arrayWithOldNotes.push({
          id: parsedLocalStObj.id,
          name: parsedLocalStObj.name,
          data: parsedLocalStObj.data,
          folder: parsedLocalStObj.folder,
          renderNote: true,
        });
      });
      arrayWithOldNotes.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

      let oldFolders = [];

      for (let note of arrayWithOldNotes) {
        if (!this.state.notesFolders.includes(note.folder)) {
          oldFolders.push(note.folder);
        }
      }

      this.setState({
        notesArray: arrayWithOldNotes,
        noteId: arrayWithOldNotes.length,
        notesFolders: [...this.state.notesFolders, ...new Set(oldFolders)],
      });
    } else {
      return;
    }
  };

  toggleModal = () => {
    this.setState((state) => ({
      ...state,
      isModalOpen: !state.isModalOpen,
    }));
  };

  onNoteSave = (note) => {
    this.setState({
      notesArray: [...this.state.notesArray, note],
      noteId: note.id + 1,
      isModalOpen: false,
    });
    if (!this.state.notesFolders.includes(note.folder)) {
      this.setState({
        notesFolders: [...this.state.notesFolders, note.folder],
      });
    }
    let localStObj = {
      name: note.name,
      data: note.data,
      id: note.id,
      folder: note.folder,
    };
    localStorage.setItem(`Note ${note.id}`, JSON.stringify(localStObj));
  };

  onNoteUpdate = (noteToUpdate) => {
    let newNotesArray = [];

    for (let i = 0; i < this.state.notesArray.length; i++) {
      if (this.state.notesArray[i].id === noteToUpdate.id) {
        newNotesArray.push(noteToUpdate);
      } else {
        newNotesArray.push(this.state.notesArray[i]);
      }
    }
    if (!this.state.notesFolders.includes(noteToUpdate.folder)) {
      this.setState({
        notesFolders: [...this.state.notesFolders, noteToUpdate.folder],
      });
    }
    let localStObj = {
      name: noteToUpdate.name,
      data: noteToUpdate.data,
      id: noteToUpdate.id,
      folder: noteToUpdate.folder,
    };
    localStorage.setItem(`Note ${noteToUpdate.id}`, JSON.stringify(localStObj));

    this.setState({ notesArray: newNotesArray });
  };

  onNoteDelete = (noteIdToDelete) => {
    Object.keys(localStorage).forEach((note) => {
      let retrievedLocalStObj = localStorage.getItem(note);
      let parsedLocalStObj = JSON.parse(retrievedLocalStObj);

      if (noteIdToDelete === parsedLocalStObj.id) {
        localStorage.removeItem(note);
      }
    });
    const newNotesArray = this.state.notesArray.filter((note) => {
      return note.id !== noteIdToDelete;
    });
    this.setState({ notesArray: newNotesArray });
  };

  onFolderChange = (event) => {
    if (event.target.value !== "--Unsorted--") {
      this.setState({
        visibleFolder: event.target.value,
        showAllFolders: false,
      });
    } else {
      this.setState({
        showAllFolders: true,
      });
    }
  };

  render() {
    const {
      isModalOpen,
      notesArray,
      noteId,
      notesFolders,
      showAllFolders,
      visibleFolder,
    } = this.state;
    return (
      <div className="App">
        <header className="tc">
          <h1 className="f1 tc">Notes</h1>
          <button
            onClick={this.toggleModal}
            className="b pa2 grow pointer bg-light-green b--black-20"
          >
            Add Note
          </button>
        </header>
        {this.state.isModalOpen && (
          <Modal>
            <NoteAdd
              toggleModal={this.toggleModal}
              NoteSave={this.onNoteSave}
              isModalOpen={isModalOpen}
              id={noteId}
              notesFolders={notesFolders}
            />
          </Modal>
        )}
        <div id="folder-container">
          <div className="tc pt3 pb3">
            <label htmlFor="folder-select" className="dib mb3">
              Select a folder:
            </label>
            <br />
            <select
              name="folders"
              id="folder-select"
              onChange={this.onFolderChange}
            >
              <option value="--Unsorted--">Select folder</option>
              {this.state.notesFolders.map((folder) => {
                return (
                  <option value={folder} key={folder}>
                    {folder}
                  </option>
                );
              })}
            </select>
          </div>
          <NoteList
            notes={notesArray}
            notesFolders={notesFolders}
            visibleFolder={visibleFolder}
            showAllFolders={showAllFolders}
            onNoteDelete={this.onNoteDelete}
            onNoteUpdate={this.onNoteUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;
