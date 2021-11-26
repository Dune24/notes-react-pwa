import React from "react";
import "./NoteAdd.css";

class NoteAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: "",
      id: 0,
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.id + 1 });
  }

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

  onSave = () => {
    this.props.NoteSave({
      name: this.state.name,
      data: this.state.data,
      id: this.state.id,
      renderNote: true,
    });
    this.setState({ id: this.state.id + 1 });
  };

  render() {
    const { toggleModal } = this.props;
    return (
      <div className="note-modal">
        <article className="br3 ba bg-white b--black-10 w-100 w-75-m mw7 shadow-5 center">
          <div className="modal-close fr pr2" onClick={toggleModal}>
            &times;
          </div>
          <main className="pa4 black-80 w-100">
            <h1>Add note</h1>
            <hr />
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
            ></textarea>
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={this.onSave}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
        </article>
      </div>
    );
  }
}
export default NoteAdd;
