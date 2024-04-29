import React, { useContext } from "react";
import NoteContext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const { note, updateNote } = props;

  const noteContext = useContext(NoteContext);
  const { delNote } = noteContext;
  const handleClick = () => {
    if (delNote(note?._id)) alert("note deleted!");
  };
  return (
    <div className="col-md-5">
      <div className="card my-3">
        <div className="card-body">
          <div
            className="d-flex align-items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5 className="card-title">{note?.title}</h5>
            <div>
              <i className="fa-solid fa-trash mx-2" onClick={handleClick}></i>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote();
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{note?.description}</p>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {note?.tags?.map((tag) => {
              return (
                <span className="badge bg-success px-2" key={tag}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
