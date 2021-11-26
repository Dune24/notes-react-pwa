import React from "react";

class NoteCard extends React.Component {
  delete = () => {
    this.props.onNoteDelete(this.props.id);
  };

  render() {
    return (
      <div className="bg-light-green br3 pa3 w5 ma4 bw2 dib shadow-5">
        <div className="fr f2" onClick={this.delete}>
          &times;
        </div>
        <h2 className="tc background-white">{this.props.name}</h2>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

export default NoteCard;
