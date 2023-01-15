import React from "react";
import Notes from "./Notes";
import { showAlert} from "../App"


export const Home = (props) => {
  return (
    <>
      <Notes showAlert={props.showAlert} />
    </>
  );
};
