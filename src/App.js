import React, { Component } from 'react';
import NoteAdd from './components/NoteAdd/NoteAdd';
import Modal from './components/Modal/Modal';
import NoteList from './components/NoteList';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isModalOpen: true,
      noteName: '',
      noteData: '',
      notesArray: [],
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isModalOpen: !state.isModalOpen,
    }));
  }
  onNoteSave = (note) => {
    this.state.notesArray.push({name: note.name, data: note.data});
    this.setState({
        noteName: note.name,
        noteData: note.data
    })
  }

  render() {
    const { isModalOpen, notesArray } = this.state;
    return (
      <div className="App">
        <header className="App-header tc">
          <h1 className="f1">Notes</h1>
          <button onClick={this.toggleModal}>Add Note</button>
        </header>
        {
        this.state.isModalOpen && <Modal>
          <NoteAdd toggleModal={this.toggleModal} isModalOpen={isModalOpen} NoteSave={this.onNoteSave}/>
        </Modal>
        }
        <div>
          <NoteList notes={notesArray}/>
        </div>
      </div>
    );
  }
}

export default App;
