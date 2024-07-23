import { useState } from "react";
import noteContext from "./notecontext";
const host = process.env.REACT_APP_API_ENDPOINT;

const NoteState = (props) => {
  const notesinit = [];
  const [notes, setNotes] = useState(notesinit);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tags) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    // eslint-disable-next-line
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //delete a note
  const delNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    // getAllNotes();
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  //edit a note
  const editNote = async (id, title, description, tags) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    // eslint-disable-next-line
    const json = response.json();

    // notes.forEach((note) => {
    //   if (note._id === id) {
    //     note.title = title;
    //     note.description = description;
    //     note.tag = tag;
    //   }
    // });

    getAllNotes();
  };

  return (
    <noteContext.Provider
      value={{ notes, getAllNotes, addNote, delNote, editNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
