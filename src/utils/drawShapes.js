export const drawShapes = (shapes, canvasRef) => {
  const canvas = canvasRef.current;

  if (!canvas) return; // Ensure the canvas element exists

  const ctx = canvas.getContext("2d");

  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sort shapes by zIndex (ascending order)
  const sortedShapes = [...shapes].sort((a, b) => a.zIndex - b.zIndex); // Sort shapes based on zIndex

  sortedShapes.forEach(
    ({ type, x, y, width, height, color, radius, rotation, vertexCount, vertices }) => {
      ctx.fillStyle = color; // Set the fill color for the shape

      if (type === "Rectangle" && width && height) {
        ctx.fillRect(x, y, width, height); // Draw a rectangle
      } else if (type === "Triangle" && width && height) {
        ctx.beginPath();
        ctx.moveTo(x, y); // Starting point
        ctx.lineTo(x + width / 2, y - height); // Top point
        ctx.lineTo(x + width, y); // Bottom-right point
        ctx.closePath();
        ctx.fill(); // Fill the triangle
      } else if (type === "Circle" && radius) {
        ctx.beginPath(); // Start a new path
        ctx.arc(x, y, radius, 0, 2 * Math.PI); // Draw a circle
        ctx.closePath(); // Close the path
        ctx.fill(); // Fill the circle
      } else if (type === "Polygon" && vertices && vertexCount >= 3) {
        ctx.save(); // Save the current state
        ctx.translate(x + width / 2, y + height / 2); // Move to the center of the polygon
        ctx.rotate((rotation * Math.PI) / 180); // Rotate the context

        ctx.beginPath();

        // Drawing the polygon by scaling its vertices
        for (let i = 0; i < vertices.length; i++) {
          const vertex = vertices[i];
          const angle = (i * 2 * Math.PI) / vertexCount;
          const px = (vertex.x * width) / 2; // Scale based on width
          const py = (vertex.y * height) / 2; // Scale based on height

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.fill(); // Fill the polygon
        ctx.restore(); // Restore the previous state
      }
    }
  );
};
