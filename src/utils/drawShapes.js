export const drawShapes = (shapes, canvasRef) => {
  const canvas = canvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sort shapes by zIndex
  const sortedShapes = [...shapes].sort((a, b) => a.zIndex - b.zIndex);

  sortedShapes.forEach(
    ({ type, x, y, width, height, color, radius, vertexCount, vertices }) => {
      ctx.fillStyle = color;

      if (type === "Rectangle" && width && height) {
        ctx.fillRect(x, y, width, height); // Draw rectangle
      } else if (type === "Triangle" && width && height) {
        ctx.beginPath();
        ctx.moveTo(x, y); // Starting point
        ctx.lineTo(x + width / 2, y - height); // Top point
        ctx.lineTo(x + width, y); // Bottom-right point
        ctx.closePath();
        ctx.fill(); // Fill the triangle
      } else if (type === "Circle" && radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI); // Draw circle
        ctx.closePath();
        ctx.fill(); // Fill the circle
      } else if (type === "Polygon" && vertices && vertexCount >= 3) {
        ctx.save();
        // Center the polygon by translating the canvas context
        ctx.translate(x, y); // Center at (x, y)
        ctx.beginPath();

        // Draw the polygon by connecting the vertices
        vertices.forEach((vertex, i) => {
          if (i === 0) {
            ctx.moveTo(vertex.x, vertex.y); // Start point
          } else {
            ctx.lineTo(vertex.x, vertex.y); // Draw each line
          }
        });

        ctx.closePath();
        ctx.fill(); // Fill the polygon
        ctx.restore(); // Restore the previous canvas state
      }
    }
  );
};
