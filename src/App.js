import React, { useState } from "react";
import LeftMenu from "./components/LeftMenu";
import ShapeViewport from "./components/ShapeViewport";
import TopToolbar from "./components/TopToolbar";
import { parseShapeFile } from "./utils/parseShapeFile";
import { ShapeList } from "./utils/shapeLinkedList"; // Import ShapeList
import "./App.css";

const App = () => {
  const [shapes, setShapes] = useState(new ShapeList()); // Use ShapeList for shapes
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

      const newShapes = new ShapeList();
      parsedShapes.forEach((shape) => {
        newShapes.insert(shape);
      });

      setShapes(newShapes); // Set the new linked list of shapes
      setFileContent(fileContent); // Save the file content in memory
      setFileName(file.name); // Set file name
      setIsFileModified(false); // Reset the modified flag after opening a file
    };
    reader.readAsText(file);
  };

  // Function to handle adding a new shape to the existing shapes list
  const handleCreateNewShape = (newShape) => {
    setShapes((prevShapes) => {
      // Create a new linked list and insert the new shape
      const newShapes = new ShapeList();
      const arrayShapes = prevShapes.toArray(); // Convert the old shapes to an array
      arrayShapes.forEach((shape) => newShapes.insert(shape)); // Reinsert old shapes
      newShapes.insert(newShape); // Insert the new shape
      setIsFileModified(true); // Mark the file as modified
      return newShapes; // Return the updated linked list
    });
  };

  // Function to update the shape after dragging
  const handleShapeUpdate = (updatedShape) => {
    setShapes((prevShapes) => {
      const newShapes = new ShapeList();
      const arrayShapes = prevShapes.toArray();
      arrayShapes.forEach((shape) => {
        if (shape.zIndex === updatedShape.zIndex) {
          newShapes.insert(updatedShape); // Update the shape
        } else {
          newShapes.insert(shape); // Keep the other shapes unchanged
        }
      });
      setIsFileModified(true); // Mark as modified after drag
      return newShapes;
    });
  };

  // Function to save the updated file (in-memory)
  const handleSaveFile = () => {
    const updatedContent = shapes.toArray()
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

    setFileContent(updatedContent); // Save the content to memory
    alert("Changes have been saved to the file."); // Notify user
    setIsFileModified(false); // Reset the modified flag
  };

  return (
    <div className="app">
      <TopToolbar
        fileName={fileName}
        onSaveFile={handleSaveFile}
        isFileModified={isFileModified}
        shapes={shapes.toArray()} // Pass shapes as array for rendering
      />
      <div className="main-content">
        <LeftMenu onFileOpen={handleFileOpen} onCreateNewShape={handleCreateNewShape} />
        <ShapeViewport shapes={shapes.toArray()} onShapeUpdate={handleShapeUpdate} />
      </div>
    </div>
  );
};

export default App;
