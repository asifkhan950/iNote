import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navibar } from "./components/Navibar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

const App=()=> {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <h1> Welcome to iNotes Online </h1>
      <Alert alert={alert}/>
      <div className="container">
        <NoteState>
          <Navibar />
          
          <Routes>
            <Route exact path="/Home"  element={<Home showAlert = {showAlert} />} />
            <Route exact path="/About"   element={<About showAlert = {showAlert} />} />
            <Route exact path="/login"   element={<Login showAlert = {showAlert} />} />
            <Route exact path="/signup"   element={<Signup showAlert = {showAlert} />} />
          </Routes>
        </NoteState>
      </div>
    </>
  );
}

export default App;
