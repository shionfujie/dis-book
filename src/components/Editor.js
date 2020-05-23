import React, { useState, useEffect } from "react";
import {selectNode} from "../utils/selectNode"
import "./Editor.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("logging error");
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      this.setState({ hasError: false });
      return null;
    }

    return this.props.children;
  }
}

function useForceUpdate() {
  const [forceUpdating, setForceUpdating] = useState(false);
  useEffect(() => {
    if (forceUpdating) setForceUpdating(false);
  }, [forceUpdating]);

  return [forceUpdating, () => setForceUpdating(true)];
}

const Editor = ({ onChange }) => {
  const [text, setText] = useState("");
  const textIsEmpty = text === "";
  const [forceUpdating, forceUpdate] = useForceUpdate();

  let node;
  const ref = _node => {
    node = _node;
  };

  const render = () => {
    return (
      <div
        className="Editor"
        ref={ref}
        contentEditable
        style={{ WebkitUserModify: "read-write-plaintext-only" }}
        onInput={onInput}
      >
        <ErrorBoundary>
          {!forceUpdating &&
            (textIsEmpty ? <EmptyInput /> : <NonEmptyInput text={text} />)}
        </ErrorBoundary>
        {}
      </div>
    );
  };

  const onInput = () => {
    const dataText = node.querySelector("[data-text]");
    if (dataText !== null) {
      setText(dataText.innerText);
      return;
    }
    const placeholder = node.querySelector("[data-placeholder]");
    if (placeholder !== null) setText(placeholder.innerText.replace(/\n$/, ""));
    else {
      const childrenLength = node.childNodes.length;
      if (childrenLength > 0) node.removeChild(node.childNodes[0]);
      else if (childrenLength == 0) forceUpdate();
      setText("");
    }
  };

  return render();
};

const NonEmptyInput = ({ text }) => {
  const initialize = node => {
    if (node === null) return;
    node.innerText = text;
    selectNode(node);
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
          if (node !== null) selectNode(node);
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
