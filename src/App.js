import React, { useState } from "react";
import LeftMenu from "./components/LeftMenu";
import ShapeViewport from "./components/ShapeViewport";
import TopToolbar from "./components/TopToolbar";
import { parseShapeFile } from "./utils/parseShapeFile"; // Importing the parsing utility
import "./App.css";

const App = () => {
  const [shapes, setShapes] = useState([]); // State to hold parsed shapes
  const [fileName, setFileName] = useState(null); // State to hold file name

  // Function to handle file input and parse shape data
  const handleFileOpen = (file) => {
    console.log("File selected in App:", file); // Debugging: Check file object

    // Check if the file has a valid extension (e.g., .txt or .shapefile)
    const validExtensions = [".txt", ".shapefile"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(`.${fileExtension}`)) {
      alert("Please select a text-based shape file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      console.log("File content:", fileContent); // Debugging: Verify content of file
      
      const parsedShapes = parseShapeFile(fileContent); // Parse the content of the file
      setShapes(parsedShapes); // Update shapes state
      setFileName(file.name); // Set the file name when the file is selected
    };
    reader.readAsText(file); // Read the file as text
  };

  return (
    <div className="app">
      {/* Top Toolbar with file name */}
      <TopToolbar fileName={fileName} />
      <div className="main-content">
        {/* Left Menu to open files */}
        <LeftMenu onFileOpen={handleFileOpen} />
        {/* Shape Viewport to render parsed shapes */}
        <ShapeViewport shapes={shapes} />
      </div>
    </div>
  );
};

export default App;
