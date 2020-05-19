import React, { useState, forwardRef } from "react";
import "./Editor.css";

const Editor = ({ onChange }) => {
  const [text, setText] = useState("");
  let input;
  const ref = node => {
    input = node;
  };

  console.log(`text: ${text}`);
  return (
    <div
      className="Editor"
      contentEditable
      style={{
        WebkitUserModify: "read-write-plaintext-only"
      }}
    >
     <EmptyInput ref={ref} />
    </div>
  );
};

const createSelection = (node, position) => {
  const r = document.createRange();
  r.setStart(node, position);
  r.collapse(true);
  return r;
};

const NonEmptyInput = forwardRef(({ text }, ref) => {
  const initializeNode = node => {
    node.innerText = text.replace(/\n$/, "");

    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(createSelection(node, text.length - 1));
  };
  return (
    <span ref={ref}>
      <span
        ref={node => {
          console.log(`text: ${text}, node: ${node}`);
          if (node && node.innerText === "") initializeNode(node);
        }}
      />
    </span>
  );
});

const EmptyInput = forwardRef(({}, ref) => {
  return (
    <>
      <span ref={ref}>
        <br />
      </span>
      <Hint />
    </>
  );
});

const Hint = () => {
  return (
    <span contentEditable className="Editor__hint">
      {"Click here to start typing"}
    </span>
  );
};

export default Editor;
