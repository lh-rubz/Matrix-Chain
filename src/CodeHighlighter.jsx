import React from "react";
import "./CodeHighlighter.css"; 

const CodeHighlighter = ({ code, currentLine }) => {
  return (
    <pre className="code-container">
      {code.map((line, index) => (
        <div
          key={index}
          className={`code-line ${currentLine === index || currentLine === index + 1 ? "highlight" : ""}`}
        >
          {line}
        </div>
      ))}
    </pre>
  );
};

export default CodeHighlighter;
