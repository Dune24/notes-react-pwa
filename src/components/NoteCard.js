import React from "react";

class NoteCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      name: "",
      data: "",
      id: 0,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      data: this.props.data,
      id: this.props.id,
    });
  }

  deleteNote = () => {
    this.props.onNoteDelete(this.state.id);
    console.log(this.state.id);
  };

  updateNote = () => {
    this.props.onNoteUpdate({
      name: this.state.name,
      data: this.state.data,
      id: this.state.id,
      renderNote: true,
    });
    this.setState({ editMode: false });
  };

  toggleEdit = () => {
    this.setState((state) => ({
      ...state,
      editMode: !state.editMode,
    }));
  };

  onInputChange = (event) => {
    switch (event.target.name) {
      case "note-name":
        this.setState({ name: event.target.value });
        break;
      case "note-data":
        this.setState({ data: event.target.value });
        break;
      default:
        return;
    }
  };

  render() {
    return (
      <div className="bg-light-green br3 pa3 w5 ma4 bw2 dib shadow-5">
        {!this.state.editMode ? (
          <>
            <div className="fr f2" onClick={this.deleteNote}>
              &times;
            </div>
            <div className="fl f3 mt1" onClick={this.toggleEdit}>
              &#x270E;
            </div>
            <h2
              className="tc"
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {this.state.name}
            </h2>
            <p
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {this.state.data}
            </p>
          </>
        ) : (
          <div>
            <label className="mt2 fw6" htmlFor="note-name">
              Name:
            </label>
            <input
              onChange={this.onInputChange}
              type="text"
              name="note-name"
              className="pa2 ba w-100"
              placeholder="Note Name"
              minLength="4"
              maxLength="75"
              value={this.state.name}
            ></input>
            <label className="mt2 fw6" htmlFor="note-data">
              Text:
            </label>
            <textarea
              onChange={this.onInputChange}
              name="note-data"
              className="pa2 ba w-100"
              placeholder="Enter text (max 1000 char.)"
              maxLength="1000"
              value={this.state.data}
            ></textarea>
            <div
              className="mt4 flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-green b--black-20"
                onClick={this.updateNote}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={this.toggleEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NoteCard;
