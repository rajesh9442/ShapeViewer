import React, { useState } from "react";

const LeftMenu = ({ onFileOpen, onCreateNewShape }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store the list of uploaded files
  const [activeFileIndex, setActiveFileIndex] = useState(null); // Track the active file
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [selectedShape, setSelectedShape] = useState(""); // Track selected shape
  const [shapeInputs, setShapeInputs] = useState([]); // Track dynamically generated inputs
  const [inputValues, setInputValues] = useState({}); // Store the values of inputs
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // Track if save button should be enabled

  const colorOptions = ["Red", "Green", "Blue", "Yellow", "Black", "White"]; // Color options for dropdown

  // Color code mapping
  const colorCodeMap = {
    Red: "#ff0000",
    Green: "#008000",
    Blue: "#0000ff",
    Yellow: "#ffff00",
    Black: "#000000",
    White: "#ffffff",
  };

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

    // Check if the file already exists based on its name
    const updatedFiles = uploadedFiles.filter(
      (file) => file.name !== newFiles[0].name
    );

    // Add the new file to the top of the list
    const finalFiles = [newFiles[0], ...updatedFiles];

    setUploadedFiles(finalFiles); // Set the updated files list

    if (newFiles.length > 0) {
      onFileOpen(newFiles[0].content); // Open the new file
      setActiveFileIndex(0); // Set the active file to the newly added one
    }

    event.target.value = ""; // Reset the input field
  };

  const handleFileClick = (file, index) => {
    if (!isModalOpen) {
      onFileOpen(file.content);
      setActiveFileIndex(index);
    }
  };

  // Modal functionality
  const handleShapeSelection = (shape) => {
    setSelectedShape(shape);
    let inputs = ["x", "y", "z", "Color"]; // Common inputs for all shapes
    if (shape === "Rectangle" || shape === "Triangle") {
      inputs = [...inputs, "Width", "Height"];
    } else if (shape === "Circle") {
      inputs = [...inputs, "Radius"];
    } else if (shape === "Polygon") {
      inputs = [...inputs, "Number of sides", "Width", "Height"];
    }

    // Add rotation input for shapes that support rotation
    if (
      shape === "Rectangle" ||
      shape === "Circle" ||
      shape === "Polygon" ||
      shape === "Triangle"
    ) {
      inputs.push("Rotation");
    }

    setShapeInputs(inputs);
    setInputValues({}); // Reset input values when shape is changed
    setIsSaveEnabled(false); // Hide save button initially
  };

  const handleInputChange = (e, key) => {
    const value = e.target.value;

    // If it's the Color field, update it separately
    if (key === "Color") {
      const newValues = { ...inputValues, [key]: value };
      setInputValues(newValues);

      // Check if all required fields are filled and color is selected
      const isAllFilled = shapeInputs.every(
        (input) => input === "Color" || newValues[input]?.trim()
      );
      const isColorSelected = newValues["Color"];

      setIsSaveEnabled(isAllFilled && isColorSelected); // Enable save button only if all are filled
    } else {
      // Allow only positive numbers (no symbols, negative numbers, or words)
      if (/^\d+$/.test(value) || value === "") {
        const newValues = { ...inputValues, [key]: value };
        setInputValues(newValues);

        // Check if all required fields are filled and color is selected
        const isAllFilled = shapeInputs.every(
          (input) => input === "Color" || newValues[input]?.trim()
        );
        const isColorSelected = newValues["Color"];

        setIsSaveEnabled(isAllFilled && isColorSelected); // Enable save button only if all are filled
      }
    }
  };

  const handleSaveShape = () => {
    // Get the color code based on selected color
    const colorCode = colorCodeMap[inputValues.Color] || inputValues.Color;

    // Construct the new shape based on selected shape type
    let newShape = {
      type: selectedShape,
      color: colorCode,
      zIndex: parseInt(inputValues.z || 0),
    };

    // Set the properties based on the shape type
    if (selectedShape === "Circle") {
      newShape = {
        ...newShape,
        x: parseInt(inputValues.x || 0),
        y: parseInt(inputValues.y || 0),
        radius: parseInt(inputValues.Radius || 0), // Only radius for Circle
        rotation: parseFloat(inputValues.Rotation) || 0, // Apply rotation
      };
    } else if (selectedShape === "Polygon") {
      newShape = {
        ...newShape,
        x: parseInt(inputValues.x || 0),
        y: parseInt(inputValues.y || 0),
        vertexCount: parseInt(inputValues["Number of sides"] || 3),
        width: parseInt(inputValues.Width || 50), // Width for Polygon
        height: parseInt(inputValues.Height || 50), // Height for Polygon
        vertices: generatePolygonVertices(inputValues), // Generate the vertices for the polygon
        rotation: parseFloat(inputValues.Rotation) || 0, // Apply rotation
      };
    } else if (selectedShape === "Rectangle" || selectedShape === "Triangle") {
      newShape = {
        ...newShape,
        x: parseInt(inputValues.x || 0),
        y: parseInt(inputValues.y || 0),
        width: parseInt(inputValues.Width || 50),
        height: parseInt(inputValues.Height || 50),
        rotation: parseFloat(inputValues.Rotation) || 0, // Apply rotation
      };
    }

    // Call the parent component to update the shapes
    onCreateNewShape(newShape);

    // Close the modal and reset states
    setIsModalOpen(false);
    setSelectedShape(""); // Clear selected shape after saving
    setShapeInputs([]); // Clear shape inputs
    setInputValues({}); // Reset input values
  };

  // Function to generate vertices for polygon based on width, height, and number of sides
  const generatePolygonVertices = (inputValues) => {
    const numberOfSides = parseInt(inputValues["Number of sides"] || 3);
    const width = parseInt(inputValues.Width || 50); // Default width for polygon
    const height = parseInt(inputValues.Height || 50); // Default height for polygon
    const vertices = [];
    const angleStep = (2 * Math.PI) / numberOfSides;

    for (let i = 0; i < numberOfSides; i++) {
      const angle = i * angleStep;
      const x = (width / 2) * Math.cos(angle); // Scale based on width
      const y = (height / 2) * Math.sin(angle); // Scale based on height
      vertices.push({ x, y });
    }

    return vertices;
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
            transition: "background-color 0.3s ease", // Smooth transition for hover effect
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#006400")} // Darker green on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = "green")} // Reset to original green color
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
            backgroundColor: "#d3d3d3", // Grey color
            fontSize: "16px",
            border: "2px dotted #333",
            borderRadius: "4px",
            cursor: uploadedFiles.length === 0 ? "not-allowed" : "pointer", // Disabled cursor
            textAlign: "center",
            transition: "background-color 0.3s ease", // Smooth transition for hover effect
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#b0b3b8")} // Darker grey on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#d3d3d3")} // Reset to original grey color
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
                <h4 style={{ marginTop: "20px" }}>
                  Enter {selectedShape} Details
                </h4>
                <form>
                  {shapeInputs.map((input, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <label
                        style={{ marginRight: "10px", fontWeight: "bold" }}
                      >
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
                          type="number" // Only positive numbers allowed
                          value={inputValues[input] || ""}
                          onChange={(e) => handleInputChange(e, input)}
                          style={{
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "150px",
                          }}
                          min="0" // Restrict to positive numbers only
                        />
                      )}
                    </div>
                  ))}
                </form>
              </>
            )}
            {isSaveEnabled && (
              <button
                onClick={handleSaveShape} // Trigger the save functionality
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
