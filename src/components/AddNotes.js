import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNotes = (props) => {
  const [note, setNotes] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const context = useContext(noteContext);
  const { addNote } = context;

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <h2> Add Your Notes here.!</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
               Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Notes
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNotes;
