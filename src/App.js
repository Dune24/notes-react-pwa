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
      Object.keys(localStorage).forEach((key) => {
        let retrievedLocalStObj = localStorage.getItem(key);
        let parsedLocalStObj = JSON.parse(retrievedLocalStObj);
        arrayWithOldNotes.push({
          id: parsedLocalStObj.id,
          name: parsedLocalStObj.name,
          data: parsedLocalStObj.data,
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
    let localStObj = {
      name: note.name,
      data: note.data,
      id: note.id,
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
    let localStObj = {
      name: noteToUpdate.name,
      data: noteToUpdate.data,
      id: noteToUpdate.id,
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
