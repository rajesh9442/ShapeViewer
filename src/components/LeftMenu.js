import React from "react";

const LeftMenu = ({ onFileOpen }) => {
  const menuStyle = {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRight: "1px solid #ccc",
    width: "200px",
  };

  const labelStyle = {
    cursor: "pointer",
    display: "block",
    margin: "10px 0",
    fontSize: "16px",
    color: "#333",
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      onFileOpen(file); // Trigger the onFileOpen callback with the file
    }
  };

  return (
    <div style={menuStyle}>
      <label style={labelStyle}>
        Open shape file
        <input
          type="file"
          accept=".txt,.shapefile"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default LeftMenu;