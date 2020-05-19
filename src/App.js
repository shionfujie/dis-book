import React, { useState } from "react";
import "./App.css";
import CenteredContent from "./components/CenteredContent";
import Editor from "./components/Editor";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="App-header">
      <CenteredContent>
        <Editor text={text} onChange={setText} />
      </CenteredContent>
    </div>
  );
}

export default App;
