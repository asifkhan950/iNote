import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navibar } from "./components/Navibar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import "./App.css";

function App() {
  return (
    <>
      <h1> Welcome to iNotes Online </h1>
      <Alert message="this application is amazing" />
      <div className="container">
        <NoteState>
          <Navibar />
          <Routes>
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/About" element={<About />} />
          </Routes>
        </NoteState>
      </div>
    </>
  );
}

export default App;
