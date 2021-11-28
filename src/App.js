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

  toggleModal = () => {
    this.setState((state) => ({
      ...state,
      isModalOpen: !state.isModalOpen,
    }));
  };

  onNoteSave = (note) => {
    this.setState({
      notesArray: [...this.state.notesArray, note],
      noteId: note.id,
      isModalOpen: false,
    });
  };

  onNoteUpdate = (noteToUpdate) => {
    let newNotesArray = [];

    for (let note of this.state.notesArray) {
      if (note.id === noteToUpdate.id) {
        newNotesArray.push(noteToUpdate);
      } else {
        newNotesArray.push(note);
      }
    }
    this.setState({ notesArray: newNotesArray });
  };

  onNoteDelete = (noteIdToDelete) => {
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
