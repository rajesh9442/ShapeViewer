import React, { useState, useEffect } from "react";

const LeftMenu = ({ onFileOpen }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store the list of uploaded files
  const [activeFileIndex, setActiveFileIndex] = useState(null); // Track the active file

  const menuStyle = {
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRight: "1px solid #ccc",
    width: "200px",
    display: "flex",
    flexDirection: "column",
  };

  const menuItemStyle = (isActive) => ({
    cursor: "pointer",
    margin: "10px 0",
    fontSize: "16px",
    color: isActive ? "#fff" : "#333",
    backgroundColor: isActive ? "#007bff" : "transparent", // Highlight the active file
    textAlign: "left",
    padding: "5px",
    borderRadius: "4px",
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    const newFiles = files.map((file) => ({
      name: file.name,
      content: file,
    }));

    // Prepend the new files to the existing list
    setUploadedFiles((prev) => [...newFiles, ...prev]);

    // Call onFileOpen for the first uploaded file automatically
    if (newFiles.length > 0) {
      onFileOpen(newFiles[0].content);  // Automatically render the new file
      setActiveFileIndex(0); // Set the first file as active
    }

    event.target.value = ""; // Reset the input field
  };

  const handleFileClick = (file, index) => {
    onFileOpen(file.content); // Pass the file content to the parent handler
    setActiveFileIndex(index); // Set the clicked file as active
  };

  return (
    <div style={menuStyle}>
      {/* Upload Button */}
      <div style={menuItemStyle(false)}>
        <label>
          Open shape file
          <input
            type="file"
            multiple // Allow multiple file uploads
            accept=".txt,.shapefile"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* List of Uploaded Files */}
      <div>
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            style={menuItemStyle(index === activeFileIndex)} // Highlight active file
            onClick={() => handleFileClick(file, index)}
          >
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftMenu;
