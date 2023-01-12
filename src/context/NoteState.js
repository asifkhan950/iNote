import { useState } from "react";
import noteContext from "./noteContext";
import React from "react";

export const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesIntials = [];
  const [notes, setNotes] = useState(notesIntials);
  //GetAll Notes
  const getNotes = async () => {
    console.log("adding a new note");
    const response = await fetch(`${host}api/notes/fetchNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTc1ZTVmYzE5M2MxNmU0MjQyNTg3In0sImlhdCI6MTY3MzE3NjY1MX0.MrVrl7uwkek9xW-0vFZl2Cx6uLUIRgvGj5O1A8SFlgk",
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setNotes(json);
  };

  //add Notes
  const addNote = async (title, description, tag) => {
    console.log("adding a new note");
    const response = await fetch(`${host}api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTc1ZTVmYzE5M2MxNmU0MjQyNTg3In0sImlhdCI6MTY3MzE3NjY1MX0.MrVrl7uwkek9xW-0vFZl2Cx6uLUIRgvGj5O1A8SFlgk",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects

    setNotes(notes.concat(note));
  };

  //Delete Notes
  const deleteNotes = async (id) => {
    const response = await fetch(`${host}api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTc1ZTVmYzE5M2MxNmU0MjQyNTg3In0sImlhdCI6MTY3MzE3NjY1MX0.MrVrl7uwkek9xW-0vFZl2Cx6uLUIRgvGj5O1A8SFlgk",
      },
      // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    console.log("deleted the note" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edite Notes
  const editNotes = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTc1ZTVmYzE5M2MxNmU0MjQyNTg3In0sImlhdCI6MTY3MzE3NjY1MX0.MrVrl7uwkek9xW-0vFZl2Cx6uLUIRgvGj5O1A8SFlgk",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    //logic for client side for editing notes

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNotes, editNotes, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
