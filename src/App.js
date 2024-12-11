import React, { useState } from "react";
import LeftMenu from "./components/LeftMenu";
import ShapeViewport from "./components/ShapeViewport";
import TopToolbar from "./components/TopToolbar";
import { parseShapeFile } from "./utils/parseShapeFile";
import { adjustShapesToFit } from "./utils/adjustShapesToFit";
import "./App.css";

const App = () => {
  const [shapes, setShapes] = useState([]);
  const [fileName, setFileName] = useState(null);

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
      const parsedShapes = parseShapeFile(fileContent);

      // Adjust shapes to fit within the canvas dimensions
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const adjustedShapes = adjustShapesToFit(parsedShapes, canvasWidth, canvasHeight);

      setShapes(adjustedShapes); // Update the state with adjusted shapes
      setFileName(file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <TopToolbar fileName={fileName} />
      <div className="main-content">
        <LeftMenu onFileOpen={handleFileOpen} />
        <ShapeViewport shapes={shapes} />
      </div>
    </div>
  );
};

export default App;
