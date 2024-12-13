import React, { useEffect, useRef } from "react";
import { drawShapes } from "../utils/drawShapes";

// Function to resize the canvas dynamically based on the shapes
const resizeCanvas = (canvasRef, shapes) => {
  const canvas = canvasRef.current;
  if (canvas) {
    // Calculate the canvas size based on all shapes' positions and sizes
    const canvasWidth = Math.max(window.innerWidth, Math.max(...shapes.map(shape => shape.x + (shape.width || 0))));
    const canvasHeight = Math.max(window.innerHeight, Math.max(...shapes.map(shape => shape.y + (shape.height || 0))));

    // Set the canvas width and height to fit all shapes
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }
};

const ShapeViewport = ({ shapes }) => {
  const canvasRef = useRef(null); // Reference for the canvas element

  // Draw shapes whenever the shapes prop changes
  useEffect(() => {
    resizeCanvas(canvasRef, shapes); // Set canvas size on mount and when shapes change
    if (shapes && shapes.length > 0) {
      drawShapes(shapes, canvasRef); // Call the drawShapes function whenever shapes change
    }

    // Add event listener to resize canvas on window resize
    window.addEventListener("resize", () => resizeCanvas(canvasRef, shapes));

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", () => resizeCanvas(canvasRef, shapes));
    };
  }, [shapes]); // Only re-render when shapes change

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "auto", // Allow scrollbars to appear if canvas exceeds window size
        position: "relative", // Ensure full coverage
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%", // Ensure canvas fills the entire width
          height: "100%", // Ensure canvas fills the entire height
        }}
      >
        Your browser does not support the Canvas API.
      </canvas>
    </div>
  );
};

export default ShapeViewport;
