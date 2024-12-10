export const drawShapes = (shapes, canvasRef) => {
  const canvas = canvasRef.current;

  if (!canvas) return; // Ensure the canvas element exists

  const ctx = canvas.getContext('2d');

  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the shapes
  shapes.forEach(({ type, x, y, width, height, color }) => {
    ctx.fillStyle = color; // Set the fill color for the shape

    if (type === 'Rectangle') {
      ctx.fillRect(x, y, width, height); // Draw a rectangle
    } else if (type === 'Triangle') {
      ctx.beginPath();
      ctx.moveTo(x, y); // Starting point
      ctx.lineTo(x + width / 2, y - height); // Top point
      ctx.lineTo(x + width, y); // Bottom-right point
      ctx.closePath();
      ctx.fill(); // Fill the triangle
    }
  });
};
