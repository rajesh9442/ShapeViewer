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

        // Debugging: Log the polygon's position and coordinates
        console.log('Polygon Position: ', x, y);
        console.log('Polygon Vertices: ', vertices);

        ctx.beginPath();

        // Draw the polygon by connecting the vertices
        vertices.forEach((vertex, i) => {
          // The vertex coordinates are relative to (x, y), so we add them
          const vertexX = x + vertex.x; // Adjust by x position of polygon
          const vertexY = y + vertex.y; // Adjust by y position of polygon

          console.log(`Vertex ${i}: (${vertexX}, ${vertexY})`);  // Debug the final position

          if (i === 0) {
            ctx.moveTo(vertexX, vertexY); // Start point
          } else {
            ctx.lineTo(vertexX, vertexY); // Draw each line
          }
        });

        ctx.closePath();
        ctx.fill(); // Fill the polygon

        // Ensure the polygon's stroke is visible
        ctx.lineWidth = 2; // Set a line width for the polygon
        ctx.strokeStyle = "black"; // Add a stroke color to make it visible
        // ctx.stroke(); // Apply the stroke

        ctx.restore(); // Restore the previous canvas state
      }
    }
  );
};
