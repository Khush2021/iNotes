import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const noteContext = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = noteContext;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  };

  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (event) => {
    event.preventDefault();
    editNote(note._id, note.title, note.description, note.tag);
    closeRef.current.click();
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const closeRef = useRef(null);
  return (
    <div className="row my-3">
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                  <label htmlFor="tag">Tag</label>
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                disabled={note.title.length < 3 || note.description.length < 3}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>
      {notes.length === 0 && "No notes to display"}
      {notes.map((note, key) => {
        return (
          <Noteitem
            note={note}
            updateNote={() => {
              updateNote(note);
            }}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default Notes;
