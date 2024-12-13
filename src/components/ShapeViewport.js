import React, { useEffect, useRef } from "react";
import { drawShapes } from "../utils/drawShapes";

const ShapeViewport = ({ shapes }) => {
  const canvasRef = useRef(null); // Reference for the canvas element

  // Function to resize the canvas dynamically based on window size
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas size to the window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  // Draw shapes whenever the shapes prop changes
  useEffect(() => {
    resizeCanvas(); // Set canvas size on mount
    if (shapes && shapes.length > 0) {
      drawShapes(shapes, canvasRef); // Call the drawShapes function whenever shapes change
    }

    // Add event listener to resize canvas on window resize
    window.addEventListener("resize", resizeCanvas);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [shapes]); // Only re-render when shapes change

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden", // Prevent scrollbars
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
