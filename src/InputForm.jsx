
import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dimensions = input.split(",").map(Number);
    onSubmit(dimensions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter matrix dimensions (comma-separated, e.g., "10,20,30,40"):
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button type="submit">Start Visualization</button>
    </form>
  );
};

export default InputForm;

