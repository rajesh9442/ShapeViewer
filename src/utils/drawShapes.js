export const drawShapes = (shapes, canvasRef) => {
  const canvas = canvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // If 'shapes' is not an array, try converting it to an array
  const shapeArray = Array.isArray(shapes) ? shapes : Array.from(shapes);

  // Shapes are already sorted by zIndex, no need to sort here again
  const sortedShapes = shapeArray;  // Since shapes are inserted in sorted order

  sortedShapes.forEach(
    ({
      type,
      x,
      y,
      width,
      height,
      color,
      radius,
      vertexCount,
      vertices,
      rotation,
    }) => {
      ctx.fillStyle = color;

      // Rotation handling (convert degrees to radians)
      const angleInRadians = (rotation || 0) * (Math.PI / 180); // Convert degrees to radians

      if (type === "Rectangle" && width && height) {
        // Apply counterclockwise rotation for Rectangle
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2); // Move the origin to the center of the rectangle
        ctx.rotate(-angleInRadians); // Apply counterclockwise rotation
        ctx.fillRect(-width / 2, -height / 2, width, height); // Draw the rectangle centered at the origin
        ctx.restore();
      } else if (type === "Triangle" && width && height) {
        // Apply counterclockwise rotation for Triangle
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2); // Move the origin to the center of the triangle
        ctx.rotate(-angleInRadians); // Apply counterclockwise rotation
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2); // Bottom-left point
        ctx.lineTo(width / 2, height / 2); // Bottom-right point
        ctx.lineTo(0, -height); // Top point
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (type === "Circle" && radius) {
        // Apply counterclockwise rotation for Circle
        ctx.save();
        ctx.translate(x, y); // Move the origin to the center of the circle
        ctx.rotate(-angleInRadians); // Apply counterclockwise rotation
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI); // Draw the circle centered at the origin
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (type === "Polygon" && vertices && vertexCount >= 3) {
        // Apply counterclockwise rotation for Polygon
        ctx.save();
        ctx.translate(x, y); // Move the origin to the center of the polygon
        ctx.rotate(-angleInRadians); // Apply counterclockwise rotation
        ctx.beginPath();
        // Draw the polygon by connecting the vertices
        vertices.forEach((vertex, i) => {
          const vertexX = vertex.x;
          const vertexY = vertex.y;

          if (i === 0) {
            ctx.moveTo(vertexX, vertexY); // Start point
          } else {
            ctx.lineTo(vertexX, vertexY); // Draw each line
          }
        });
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  );
};
