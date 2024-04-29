import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import Select from "react-select"

const options = [
  {value: 'General', label: 'General'},
  {value: 'Study', label: 'Study'},
  {value: 'Research', label: 'Research'},
  {value: 'Meeting', label: 'Meeting'},
  {value: 'Ideas', label: 'Ideas'},
  {value: 'Goals', label: 'Goals'},
  {value: 'Project', label: 'Project'},
]

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
    currentNote.tags = currentNote.tags.map((tag) => ({value: tag, label: tag}))
    setNote(currentNote);
  };

  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tags: [],
  });

  const handleClick = (event) => {
    event.preventDefault();
    let tags = note.tags.map((tag) => tag.value)
    editNote(note._id, note.title, note.description, tags);
    closeRef.current.click();
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    setNote({
      ...note,
      tags: e
    })
  }

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
                  <label htmlFor="description">Description<sup style={{color: 'red'}}>*</sup></label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    name="description"
                    value={note.description}
                    onChange={onchange}
                    style={{ height: "100px" , maxHeight: "300px", textAlign: "initial"}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tags</label>
                  <Select options={options} isMulti name="tag" onChange={handleTagChange} value={note.tags}/>
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
                disabled={note.title.length === 0 || note.description.length < 5}
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
      {notes?.length === 0 && <p>No notes to display</p>}
      {notes?.map((note, key) => {
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
