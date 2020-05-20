import React, { useState, useReducer } from "react";
import "./Editor.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("logging error");
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      this.setState({hasError: false})
      return null;
    }

    return this.props.children;
  }
}
const Editor = ({ onChange }) => {
  const [text, setText] = useState("");
  let node;
  const ref = _node => {
    node = _node;
  };
  console.log(`text='${text}'`);
  return (
    <div
      className="Editor"
      contentEditable
      ref={ref}
      style={{
        WebkitUserModify: "read-write-plaintext-only"
      }}
      onInput={() => {
        console.log(node);
        const dataText = node.querySelector("[data-text]");
        console.log(dataText);
        if (dataText !== null) {
          setText(dataText.innerText);
          return;
        }
        const placeholder = node.querySelector("[data-placeholder]");
        console.log(placeholder);
        if (placeholder !== null) setText(placeholder.innerText.replace(/\n$/, ""));
        else {
          console.log("became empty");
          if (node.childNodes.length > 0)
            node.removeChild(node.childNodes[0])
            
          setText("");
        }
      }}
    >
      <ErrorBoundary>
        {text !== "" && <NonEmptyInput text={text} />}
      </ErrorBoundary>
      {text === "" && <EmptyInput />}
    </div>
  );
};

const createSelection = node => {
  const range = document.createRange();
  range.setStart(node, 1);
  range.collapse(true);
  return range;
};

const select = node => {
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(createSelection(node));
};

const NonEmptyInput = ({ text }) => {
  console.log(`NonEmptyInput: ${text}`);
  const initialize = node => {
    if (node === null) return;
    console.log(text);
    node.innerText = text;
    select(node);
  };
  return (
    <>
      <span data-text ref={initialize}></span>
    </>
  );
};

const EmptyInput = ({}) => {
  return (
    <>
      <span
        data-placeholder
        ref={node => {
          console.log(`node=${node}`)
          if (node !== null) select(node);
        }}
      >
        <br />
      </span>
      <Hint />
    </>
  );
};

const Hint = () => {
  return (
    <span contentEditable={false} className="Editor__hint">
      {"Click here to start typing"}
    </span>
  );
};

export default Editor;
