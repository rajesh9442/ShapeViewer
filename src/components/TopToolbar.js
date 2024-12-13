import React from "react";

const TopToolbar = ({ fileName, onSaveFile, isFileModified, shapes }) => {
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

  const saveButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: isFileModified ? "pointer" : "not-allowed", // Disable if no changes
    opacity: isFileModified ? 1 : 0.5, // Make the button less prominent if disabled
  };

  // Function to format shapes into the desired text format
  const formatShapesForDownload = (shapes) => {
    if (!shapes || !Array.isArray(shapes)) return ""; // Ensure shapes is a valid array

    return shapes
      .map((shape) => {
        let shapeStr = `${shape.type}, ${shape.x}, ${shape.y}, ${shape.zIndex}, `;
        if (shape.type === "Rectangle" || shape.type === "Triangle") {
          shapeStr += `${shape.width}, ${shape.height}, ${shape.color}`;
        } else if (shape.type === "Circle") {
          shapeStr += `${shape.radius}, ${shape.color}`;
        } else if (shape.type === "Polygon") {
          shapeStr += `${shape.rotation}, ${shape.vertexCount}, ${shape.color}`;
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
    const blob = new Blob([formattedContent], { type: "text/plain;charset=utf-8" });

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
        {fileName && <span style={fileNameStyle}>{fileName}</span>}
        <button
          onClick={handleDownload} // Call handleDownload when clicked
          style={saveButtonStyle}
          disabled={!isFileModified || !fileName} // Disable if no changes were made or no file is uploaded
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TopToolbar;
