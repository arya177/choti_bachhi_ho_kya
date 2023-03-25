import React from "react";
import ReactDOM from "react-dom";
import Example from "./example";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <Example />
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
