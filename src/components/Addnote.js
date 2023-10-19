import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/notecontext";

const Addnote = () => {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            placeholder="Enter title"
            name="title"
            value={note.title}
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            name="description"
            value={note.description}
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag(optional)</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Enter tag"
            name="tag"
            value={note.tag}
            onChange={onchange}
          />
        </div>
        <button
          disabled={note.title.length < 3 || note.description.length < 3}
          type="submit"
          className="btn btn-primary my-3"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
