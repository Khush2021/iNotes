import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/notecontext";
import Select from "react-select";

const options = [
  { value: "General", label: "General" },
  { value: "Study", label: "Study" },
  { value: "Research", label: "Research" },
  { value: "Meeting", label: "Meeting" },
  { value: "Ideas", label: "Ideas" },
  { value: "Goals", label: "Goals" },
  { value: "Project", label: "Project" },
];

const Addnote = () => {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: [
      {
        label: "General",
        value: "General",
      },
    ],
  });
  const handleClick = (event) => {
    event.preventDefault();
    if (note.title.length === 0) {
      alert("title length should be greater than 0!");
      return;
    }
    if (note.description.length < 5) {
      alert("Description must be atleast 5 characters");
      return;
    }
    let tags = note.tags.map((tag) => tag.value);
    addNote(note.title, note.description, tags);
    setNote({
      title: "",
      description: "",
      tags: [
        {
          label: "General",
          value: "General",
        },
      ],
    });
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleTagChange = (e) => {
    setNote({
      ...note,
      tags: e,
    });
  };
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">
            Title<sup style={{ color: "red" }}>*</sup>
          </label>
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
          <label htmlFor="description">
            Description<sup style={{ color: "red" }}>*</sup>
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            name="description"
            value={note.description}
            onChange={onchange}
            style={{
              height: "100px",
              maxHeight: "300px",
              textAlign: "initial",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tags(optional)</label>
          <Select
            options={options}
            isMulti
            name="tag"
            id="tag"
            onChange={handleTagChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-3"
          id="add-note-btn"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
