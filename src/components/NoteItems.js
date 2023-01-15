import React, { useContext } from "react";

import noteContext from "../context/noteContext";
const NoteItems = (props) => {
  const context = useContext(noteContext);
  const { deleteNotes } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>

          <p className="card-text">{note.description}</p>
          <div className="d-flex align-items-center">
            <i
              className="fa-solid fa-file-pen mx-2"
              onClick={() => {
                updateNote(note);
                
              }}
            ></i>
            <i
              className="fa-regular fa-trash-can mx-2"
              onClick={() => {
                deleteNotes(note._id);
                props.showAlert("delete successfully","success")
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
