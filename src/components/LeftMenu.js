import React, { useState, useEffect } from "react";

const LeftMenu = ({ onFileOpen, onCreateNewShape }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store the list of uploaded files
  const [activeFileIndex, setActiveFileIndex] = useState(null); // Track the active file
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [selectedShape, setSelectedShape] = useState(""); // Track selected shape
  const [shapeInputs, setShapeInputs] = useState([]); // Track dynamically generated inputs
  const [inputValues, setInputValues] = useState({}); // Store the values of inputs
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // Track if save button should be enabled

  const colorOptions = ["Red", "Green", "Blue", "Yellow", "Black", "White"]; // Color options for dropdown

  // Styles
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

  // File handling
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      name: file.name,
      content: file,
    }));

    setUploadedFiles((prev) => [...newFiles, ...prev]);

    if (newFiles.length > 0) {
      onFileOpen(newFiles[0].content);
      setActiveFileIndex(0);
    }

    event.target.value = ""; // Reset the input field
  };

  const handleFileClick = (file, index) => {
    if (!isModalOpen) { // Disable functionality when modal is open
      onFileOpen(file.content);
      setActiveFileIndex(index);
    }
  };

  // Modal functionality
  const handleShapeSelection = (shape) => {
    setSelectedShape(shape);
    let inputs = [];

    switch (shape) {
      case "Rectangle":
      case "Triangle":
        inputs = ["x", "y", "z", "Width", "Height", "Color"];
        break;
      case "Circle":
        inputs = ["x", "y", "z", "Radius", "Color"];
        break;
      case "Polygon":
        inputs = ["x", "y", "z", "Rotation angle", "Number of sides"];
        break;
      default:
        break;
    }

    setShapeInputs(inputs);
    setInputValues({}); // Reset input values when shape is changed
    setIsSaveEnabled(false); // Hide save button initially
  };

  const handleInputChange = (e, key) => {
    const newValues = { ...inputValues, [key]: e.target.value };
    setInputValues(newValues);

    // Check if all required fields are filled and color is selected
    const isAllFilled = shapeInputs.every((input) => input === "Color" || newValues[input]?.trim());
    const isColorSelected = newValues["Color"];

    setIsSaveEnabled(isAllFilled && isColorSelected); // Enable save button only if all are filled
  };

  return (
    <div style={menuStyle}>
      {/* Upload Button */}
      <div style={{ marginBottom: "20px" }}>
        <input
          id="file-input"
          type="file"
          multiple
          accept=".txt,.shapefile"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          onClick={() => document.getElementById("file-input").click()}
          style={{
            display: "inline-block",
            padding: "10px 15px",
            backgroundColor: "green",
            color: "#fff",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Open shape file
        </button>
      </div>

      {/* Create New Shape Button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          disabled={uploadedFiles.length === 0} // Disable if no files are uploaded
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 15px",
            backgroundColor: uploadedFiles.length === 0 ? "#d3d3d3" : "#d3d3d3", // Disabled style when no files
            fontSize: "16px",
            border: "2px dotted #333",
            borderRadius: "4px",
            cursor: uploadedFiles.length === 0 ? "not-allowed" : "pointer", // Disabled cursor
            textAlign: "center",
          }}
        >
          <span style={{ marginRight: "8px", fontSize: "18px" }}>➕</span>
          Create New shape
        </button>
      </div>

      {/* List of Uploaded Files */}
      <div>
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            style={menuItemStyle(index === activeFileIndex)}
            onClick={() => handleFileClick(file, index)}
          >
            {file.name}
          </div>
        ))}
      </div>

      {/* Backdrop and Modal for Shape Selection */}
      {isModalOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999, // Ensure it covers the entire screen
            }}
            onClick={() => setIsModalOpen(false)} // Close modal on backdrop click
          ></div>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000, // Ensure it's above the backdrop
            }}
          >
            <h3>Select Shape</h3>
            <div>
              {["Rectangle", "Triangle", "Circle", "Polygon"].map((shape) => (
                <button
                  key={shape}
                  onClick={() => handleShapeSelection(shape)}
                  style={{
                    margin: "5px",
                    padding: "8px 15px",
                    border: "1px solid #007bff",
                    borderRadius: "4px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {shape}
                </button>
              ))}
            </div>

            {selectedShape && (
              <>
                <h4 style={{ marginTop: "20px" }}>Enter {selectedShape} Details</h4>
                <form>
                  {shapeInputs.map((input, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <label style={{ marginRight: "10px", fontWeight: "bold" }}>
                        {input}:
                      </label>
                      {input === "Color" ? (
                        <select
                          value={inputValues[input] || ""}
                          onChange={(e) => handleInputChange(e, input)}
                          style={{
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "160px",
                          }}
                        >
                          <option value="">Select Color</option>
                          {colorOptions.map((color, idx) => (
                            <option key={idx} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={inputValues[input] || ""}
                          onChange={(e) => handleInputChange(e, input)}
                          style={{
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "150px",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </form>
              </>
            )}
            {isSaveEnabled && (
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Save Shape
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LeftMenu;

