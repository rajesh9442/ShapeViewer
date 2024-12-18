import React, { useEffect, useRef } from "react";
import { drawShapes } from "../utils/drawShapes";

// Function to resize the canvas dynamically based on the shapes
const resizeCanvas = (canvasRef, shapes) => {
  const canvas = canvasRef.current;
  if (canvas) {
    // Get the maximum width and height from the shapes
    const maxX = Math.max(...shapes.map((shape) => {
      if (shape.type === "Circle") {
        return shape.x + shape.radius; // For Circle, use x + radius
      } else {
        return shape.x + (shape.width || 0); // For other shapes, use x + width
      }
    }));

    const maxY = Math.max(...shapes.map((shape) => {
      if (shape.type === "Circle") {
        return shape.y + shape.radius; // For Circle, use y + radius
      } else {
        return shape.y + (shape.height || 0); // For other shapes, use y + height
      }
    }));

    // Calculate the aspect ratio based on the canvas size we want (for example, 16:9 aspect ratio)
    const aspectRatio = 16 / 9;

    // Adjust the canvas width and height to maintain the aspect ratio
    let canvasWidth = Math.max(window.innerWidth, maxX);
    let canvasHeight = Math.max(window.innerHeight, maxY);

    // If width is much larger than the height, adjust height based on the aspect ratio
    if (canvasWidth / canvasHeight > aspectRatio) {
      canvasHeight = canvasWidth / aspectRatio; // Adjust height to maintain aspect ratio
    } else {
      canvasWidth = canvasHeight * aspectRatio; // Adjust width to maintain aspect ratio
    }

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
      window.removeEventListener("resize", () =>
        resizeCanvas(canvasRef, shapes)
      );
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
