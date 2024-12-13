import React, { useState } from "react";
import LeftMenu from "./components/LeftMenu";
import ShapeViewport from "./components/ShapeViewport";
import TopToolbar from "./components/TopToolbar";
import { parseShapeFile } from "./utils/parseShapeFile";
import { adjustShapesToFit } from "./utils/adjustShapesToFit";
import "./App.css";

const App = () => {
  const [shapes, setShapes] = useState([]); // Stores parsed and added shapes
  const [fileContent, setFileContent] = useState(""); // Stores file content in memory
  const [fileName, setFileName] = useState(null); // Stores the uploaded file name
  const [isFileModified, setIsFileModified] = useState(false); // Track if the file has been modified

  // Handle file upload and parse shapes from the file
  const handleFileOpen = (file) => {
    const validExtensions = [".txt", ".shapefile"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(`.${fileExtension}`)) {
      alert("Please select a text-based shape file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const parsedShapes = parseShapeFile(fileContent); // Parse shapes

      // Adjust shapes to fit within the canvas dimensions
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const adjustedShapes = adjustShapesToFit(parsedShapes, canvasWidth, canvasHeight);

      setShapes(adjustedShapes); // Update the state with adjusted shapes
      setFileContent(fileContent); // Save the file content in memory
      setFileName(file.name); // Set file name
      setIsFileModified(false); // Reset the modified flag after opening a file
    };
    reader.readAsText(file);
  };

  // Function to handle adding a new shape to the existing shapes list
  const handleCreateNewShape = (newShape) => {
    setShapes((prevShapes) => {
      // Add the new shape to the existing shapes
      const updatedShapes = [...prevShapes, newShape];
      
      // Adjust all shapes to fit the canvas (including the new one)
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const adjustedShapes = adjustShapesToFit(updatedShapes, canvasWidth, canvasHeight);
  
      setIsFileModified(true); // Mark the file as modified when a new shape is added
      return adjustedShapes; // Return the adjusted shapes
    });
  };
  
  

  // Function to save the updated file (in-memory)
  const handleSaveFile = () => {
    // Generate updated content from the shapes
    let updatedContent = shapes
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

    // Update the in-memory content
    setFileContent(updatedContent);

    // Notify user that the changes have been saved (or trigger a download)
    alert("Changes have been saved to the file.");
    setIsFileModified(false); // Reset modified flag after saving
  };

  return (
    <div className="app">
      <TopToolbar
        fileName={fileName}
        onSaveFile={handleSaveFile}
        isFileModified={isFileModified}
        shapes={shapes}
      /> {/* Pass updated shapes and modification flag to TopToolbar */}
      <div className="main-content">
        <LeftMenu onFileOpen={handleFileOpen} onCreateNewShape={handleCreateNewShape} />
        <ShapeViewport shapes={shapes} />
      </div>
    </div>
  );
};

export default App;
