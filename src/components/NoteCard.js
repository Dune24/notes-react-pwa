import React from "react";

class NoteCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      name: "",
      data: "",
      id: 0,
      folder: "--Unsorted--",
      newFolderEdit: false,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      data: this.props.data,
      id: this.props.id,
      folder: this.props.folder,
    });
  }

  deleteNote = () => {
    this.props.onNoteDelete(this.state.id);
  };

  updateNote = () => {
    this.props.onNoteUpdate({
      name: this.state.name,
      data: this.state.data,
      id: this.state.id,
      folder: this.state.folder,
      renderNote: true,
    });
    this.setState({ editMode: false, newFolderEdit: false });
  };

  toggleEdit = () => {
    this.setState((state) => ({
      ...state,
      editMode: !state.editMode,
    }));
  };

  onAddNewFolder = () => {
    this.setState({
      newFolderEdit: true,
    });
  };

  onInputChange = (event) => {
    switch (event.target.name) {
      case "note-name":
        this.setState({ name: event.target.value });
        break;
      case "note-data":
        this.setState({ data: event.target.value });
        break;
      case "note-folder":
        this.setState({ folder: event.target.value });
        break;
      default:
        return;
    }
  };

  render() {
    return (
      <div className="bg-light-green br3 pa3 ma3 mw5 w-50 shadow-5">
        {!this.state.editMode ? (
          <>
            <div className="fr f2 pointer" onClick={this.deleteNote}>
              &times;
            </div>
            <div className="fl f3 mt1 pointer" onClick={this.toggleEdit}>
              &#x270E;
            </div>
            <h2
              className="tc bb pb2"
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
            <label className="dib mt2 fw6 dib pb2" htmlFor="note-name">
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
            <label className="mt2 fw6 dib pb2" htmlFor="note-data">
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
            <label className="fw6 dib pt2 pb2 pr2" htmlFor="note-folder">
              Folder:
            </label>
            <select
              name="note-folder"
              id="note-folder"
              onChange={this.onInputChange}
            >
              <option value="--Unsorted--">Select folder</option>
              {this.props.notesFolders.map((folder) => {
                return (
                  <option value={folder} key={folder}>
                    {folder}
                  </option>
                );
              })}
            </select>
            <button
              className="b grow b--black-20 flex center mt2 mb2"
              onClick={this.onAddNewFolder}
            >
              Add new folder
            </button>
            {this.state.newFolderEdit && (
              <input
                onChange={this.onInputChange}
                type="text"
                name="note-folder"
                className="pa2 ba w-100"
                placeholder="Folder Name"
                minLength="3"
                maxLength="25"
              ></input>
            )}
            <div
              className="mt4 flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-green b--black-20"
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
