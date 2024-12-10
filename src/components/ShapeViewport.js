import React, { useEffect, useRef } from 'react';
import { drawShapes } from '../utils/drawShapes';

const ShapeViewport = ({ shapes }) => {
  const canvasRef = useRef(null); // Reference for the canvas element

  useEffect(() => {
    drawShapes(shapes, canvasRef); // Call the drawShapes function whenever shapes change
  }, [shapes]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
      >
        Your browser does not support the Canvas API.
      </canvas>
    </div>
  );
};

export default ShapeViewport;
