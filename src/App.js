import React, { useState } from "react";
import LeftMenu from "./components/LeftMenu";
import ShapeViewport from "./components/ShapeViewport";
import TopToolbar from "./components/TopToolbar";
import "./App.css";

const App = () => {
  const [shapes, setShapes] = useState([]); // State to hold parsed shapes
  const [fileName, setFileName] = useState(null); // State to hold file name

  // Function to handle file input and parse shape data
  const handleFileOpen = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const shapes = parseShapeFile(fileContent); // Parse the content of the file
      setShapes(shapes);
      setFileName(file.name); // Set the file name when the file is selected
    };
    reader.readAsText(file);
  };

  // Function to parse the shape file content
  const parseShapeFile = (content) => {
    const shapes = [];
    const lines = content.split(";");  // Split by semicolon to separate shapes
    
    lines.forEach((line) => {
      if (line.trim().startsWith("//") || line.trim() === "") return;

      const cleanLine = line.split("//")[0].trim(); // Clean comments
      const parts = cleanLine.split(",");

      if (parts.length < 7) return; // Ensure enough data exists for the shape

      const type = parts[0].trim();
      const x = parseInt(parts[1].trim(), 10);
      const y = parseInt(parts[2].trim(), 10);
      const zIndex = parseInt(parts[3].trim(), 10);
      const width = parseInt(parts[4].trim(), 10);
      const height = parseInt(parts[5].trim(), 10);
      const color = `#${parts[6].trim()}`;

      shapes.push({
        type,
        x,
        y,
        width,
        height,
        color,
        zIndex,
      });
    });

    return shapes;
  };

  return (
    <div className="app">
      {/* Pass fileName to TopToolbar component */}
      <TopToolbar fileName={fileName} />
      <div className="main-content">
        <LeftMenu onFileOpen={handleFileOpen} />
        <ShapeViewport shapes={shapes} />
      </div>
    </div>
  );
};

export default App;
