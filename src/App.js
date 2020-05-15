import React from "react";
import "./App.css";
import CenteredContent from "./components/CenteredContent";

function App() {
  return (
    <div className="App-header">
            <CenteredContent>
              <div style={{ background: "black", width: "100%", height: 50 }} />
            </CenteredContent>
    </div>
  );
}

export default App;
