import React, { useEffect, useRef } from 'react';
import { drawShapes } from '../utils/drawShapes';

const ShapeViewport = ({ shapes }) => {
  const canvasRef = useRef(null); // Reference for the canvas element

  // Function to resize the canvas dynamically
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  useEffect(() => {
    resizeCanvas(); // Set canvas size on mount
    drawShapes(shapes, canvasRef); // Call the drawShapes function whenever shapes change

    // Add event listener to resize canvas on window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [shapes]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden', // Prevent scrollbars
        position: 'relative', // Ensure full coverage
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      >
        Your browser does not support the Canvas API.
      </canvas>
    </div>
  );
};

export default ShapeViewport;
