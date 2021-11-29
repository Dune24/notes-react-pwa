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
    };
  }

  componentDidMount() {
    this.loadNotesFromLocalStorage();
  }

  loadNotesFromLocalStorage = () => {
    if (localStorage.length !== 0) {
      let arrayWithOldNotes = [];
      Object.keys(localStorage).forEach((key, i) => {
        arrayWithOldNotes.push({
          id: localStorage.getItem(key).slice(-1),
          name: localStorage.getItem(key).split(",")[0],
          data: localStorage.getItem(key).split(",")[1],
          renderNote: true,
        });
      });
      arrayWithOldNotes.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      this.setState({
        notesArray: arrayWithOldNotes,
        noteId: arrayWithOldNotes.length,
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
    localStorage.setItem(`Note ${this.state.noteId}`, [
      note.name,
      note.data,
      `id: ${this.state.noteId}`,
    ]);
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
    localStorage.setItem(`Note ${noteToUpdate.id}`, [
      noteToUpdate.name,
      noteToUpdate.data,
      `id:${noteToUpdate.id}`,
    ]);
    this.setState({ notesArray: newNotesArray });
  };

  onNoteDelete = (noteIdToDelete) => {
    localStorage.removeItem(`Note ${noteIdToDelete}`);
    let newNotesArray = [...this.state.notesArray];
    delete newNotesArray[noteIdToDelete];
    this.setState({ notesArray: newNotesArray });
  };

  render() {
    const { isModalOpen, notesArray, noteId } = this.state;
    return (
      <div className="App">
        <header className="tc">
          <h1 className="f1">Notes</h1>
          <button onClick={this.toggleModal}>Add Note</button>
        </header>
        {this.state.isModalOpen && (
          <Modal>
            <NoteAdd
              toggleModal={this.toggleModal}
              NoteSave={this.onNoteSave}
              isModalOpen={isModalOpen}
              id={noteId}
            />
          </Modal>
        )}
        <div>
          <NoteList
            notes={notesArray}
            onNoteDelete={this.onNoteDelete}
            onNoteUpdate={this.onNoteUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;
