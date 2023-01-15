import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/noteContext";
import NoteItems from "./NoteItems";
import AddNotes from "./AddNotes";
import {useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNotes } = context;
  const [note, setNotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log('token')
      getNotes();
    }else{
      navigate("/login")
    }
    
    
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e) => {
    editNotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("updated successfully", 'sccuess')
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
              disabled = {note.etitle.length < 5 || note.edescription.length <5 }
                onClick={handleClick}
                type="button"
                className="btn btn-dark"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row  my-3">
        <h2> Your Notes </h2>
        <div className="container mx-2">
        {notes.length === 0 && "No Notes to Display..!"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
