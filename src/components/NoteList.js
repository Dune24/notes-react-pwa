import React from "react";
import NoteCard from "./NoteCard";

class NoteList extends React.Component {
  render() {
    return (
      <div className="flex flex-wrap items-start justify-around">
        {this.props.notes.map((note) => {
          if (
            this.props.visibleFolder === note.folder ||
            this.props.showAllFolders
          ) {
            return (
              <NoteCard
                key={note.id}
                id={note.id}
                name={note.name}
                data={note.data}
                folder={note.folder}
                notesFolders={this.props.notesFolders}
                onNoteDelete={this.props.onNoteDelete}
                onNoteUpdate={this.props.onNoteUpdate}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default NoteList;
