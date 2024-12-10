import React from "react";

const TopToolbar = ({ fileName }) => {
  const toolbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    fontSize: "18px",
  };

  const fileNameStyle = {
    fontStyle: "italic",
    color: "#00ff00",
  };

  return (
    <div style={toolbarStyle}>
      <span>Shape Viewer</span>
      {fileName && <span style={fileNameStyle}>{fileName}</span>}
    </div>
  );
};

export default TopToolbar;
