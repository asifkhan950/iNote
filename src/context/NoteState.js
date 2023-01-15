import { useState } from "react";
import noteContext from "./noteContext";
import React from "react";

export const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesIntials = [];
  const [notes, setNotes] = useState(notesIntials);
  //GetAll Notes
  const getNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    setNotes(json);
  };

  //add Notes
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
      },
      // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edite Notes
  const editNotes = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects

    //update notes state with the new note
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(newNotes);

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
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
