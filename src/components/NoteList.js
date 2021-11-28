import React from "react";
import NoteCard from "./NoteCard";

class NoteList extends React.Component {
  render() {
    return (
      <div>
        {this.props.notes.map((note, i) => {
          return (
            <NoteCard
              key={i}
              id={note.id}
              name={note.name}
              data={note.data}
              onNoteDelete={this.props.onNoteDelete}
              onNoteUpdate={this.props.onNoteUpdate}
            />
          );
        })}
      </div>
    );
  }
}

export default NoteList;
