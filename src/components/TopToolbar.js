import React from "react";

const TopToolbar = ({ fileName }) => {
  return (
    <div className="top-toolbar">
      <h1>Shape Viewer</h1>
      {fileName ? (
        <span>{fileName}</span> // Display file name when a file is selected
      ) : (
        <button>Open Shape File</button> // Show button if no file is selected
      )}
    </div>
  );
};

export default TopToolbar;
