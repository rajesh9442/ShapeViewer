import React from "react";

const LeftMenu = ({ onFileOpen }) => {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected in LeftMenu:", file); // Debugging: Ensure file is being passed
      onFileOpen(file);
    }
  };

  return (
    <div className="left-menu">
      <h3>Menu</h3>
      <label htmlFor="file-input" style={{ cursor: "pointer", color: "blue" }}>
        Open Shape File
      </label>
      <input
        id="file-input"
        type="file"
        accept=".shapefile,.txt" // Allow shapefile and txt extensions
        style={{ display: "none" }}
        onChange={handleFileInput}
      />
    </div>
  );
};

export default LeftMenu;
