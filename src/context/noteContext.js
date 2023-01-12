import {Context, createContext } from "react";
const noteContext = createContext();

{/* !--> here we are making context api of our own which is used to take the states of all 
the child components and we can use them on every child of different components
through this method we can avoid the props drilling and also complexity of the app. through this method we can use
context api to access the state any where in our application */}

export default noteContext;