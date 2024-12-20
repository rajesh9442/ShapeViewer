import React from "react";

const TopToolbar = ({ fileName, onSaveFile, isFileModified, shapes, onFileOpen }) => {
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
    marginRight: "20px", // Add margin to the right for space between file name and button
  };

  const buttonStyle = {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: isFileModified ? "pointer" : "not-allowed", // Disable if no changes
    opacity: isFileModified ? 1 : 0.5, // Make the button less prominent if disabled
    transition: "background-color 0.3s ease", // Smooth transition for hover effect
    marginRight: "10px", // Add space between the buttons
    width: "200px", // Same size for both buttons
  };

  const openFileButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff", // Blue color for "Open Shape File"
    cursor: "pointer", // Make sure the cursor shows as pointer
    opacity: 1, // Ensure the button is always enabled
  };

  // Function to format shapes into the desired text format
  const formatShapesForDownload = (shapes) => {
    if (!shapes || !Array.isArray(shapes)) return ""; // Ensure shapes is a valid array

    return shapes
      .map((shape) => {
        let shapeStr = `${shape.type}, ${shape.x}, ${shape.y}, ${shape.zIndex}, `;

        // Add rotation if it's provided
        const rotation = shape.rotation !== undefined ? shape.rotation : 0;

        if (shape.type === "Rectangle" || shape.type === "Triangle") {
          shapeStr += `${shape.width}, ${shape.height}, ${shape.color}, ${rotation}`;
        } else if (shape.type === "Circle") {
          shapeStr += `${shape.radius}, ${shape.color}, ${rotation}`;
        } else if (shape.type === "Polygon") {
          // Add vertices information
          const verticesData = shape.vertices
            ? shape.vertices
                .map((vertex) => `(${vertex.x}, ${vertex.y})`)
                .join(" ")
            : "";
          shapeStr += `${shape.width}, ${shape.height}, ${shape.vertexCount}, ${shape.color}, ${verticesData}, ${rotation}`;
        }

        return shapeStr;
      })
      .join("\n");
  };

  // Function to download the updated file
  const handleDownload = () => {
    // Generate formatted content for the shapes
    const formattedContent = formatShapesForDownload(shapes);

    if (!formattedContent) {
      alert("No shapes to save!");
      return;
    }

    // Create a blob from the formatted content
    const blob = new Blob([formattedContent], {
      type: "text/plain;charset=utf-8",
    });

    // Create a link element
    const link = document.createElement("a");

    // Create an object URL from the blob
    const url = URL.createObjectURL(blob);

    // Set the download attribute with the original file name
    link.href = url;
    link.download = fileName;

    // Trigger a click event on the link to start the download
    link.click();

    // Clean up the object URL after the download
    URL.revokeObjectURL(url);
  };

  return (
    <div style={toolbarStyle}>
      <span>Shape Viewer</span>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Conditionally display the Open Shape File button if no file is selected */}
        {!fileName ? (
          <button
            onClick={() => document.getElementById("file-input").click()}
            style={openFileButtonStyle}
          >
            Open Shape File
          </button>
        ) : (
          <span style={fileNameStyle}>{fileName}</span>
        )}
        <button
          onClick={handleDownload} // Call handleDownload when clicked
          style={buttonStyle}
          disabled={!isFileModified || !fileName} // Disable if no changes were made or no file is uploaded
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")} // Darker green on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")} // Reset to original green color
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TopToolbar;
