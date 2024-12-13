export const adjustShapesToFit = (shapes, canvasWidth, canvasHeight) => {
  // Calculate the bounding box that encompasses all shapes
  const bounds = shapes.reduce(
    (acc, { type, x, y, width, height, radius, vertexCount, vertices }) => {
      if (type === 'Circle') {
        acc.minX = Math.min(acc.minX, x - radius);
        acc.minY = Math.min(acc.minY, y - radius);
        acc.maxX = Math.max(acc.maxX, x + radius);
        acc.maxY = Math.max(acc.maxY, y + radius);
      } else if (type === 'Polygon' && vertices) {
        vertices.forEach((vertex) => {
          acc.minX = Math.min(acc.minX, x + vertex.x); // Adjust by x position of polygon
          acc.minY = Math.min(acc.minY, y + vertex.y); // Adjust by y position of polygon
          acc.maxX = Math.max(acc.maxX, x + vertex.x);
          acc.maxY = Math.max(acc.maxY, y + vertex.y);
        });
      } else {
        acc.minX = Math.min(acc.minX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxX = Math.max(acc.maxX, x + width);
        acc.maxY = Math.max(acc.maxY, y + height);
      }
      return acc;
    },
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  );

  // Calculate scaling factors based on the bounding box
  const scaleX = canvasWidth / (bounds.maxX - bounds.minX);
  const scaleY = canvasHeight / (bounds.maxY - bounds.minY);
  const scale = Math.min(scaleX, scaleY); // Use the smaller of both scale factors

  // Apply the scaling and adjust the position of each shape
  return shapes.map(({ type, x, y, width, height, radius, vertexCount, color, zIndex, vertices }) => {
    if (type === 'Circle') {
      return {
        type,
        x: (x - bounds.minX) * scale,
        y: (y - bounds.minY) * scale,
        radius: radius * scale,
        color,
        zIndex,
      };
    } else if (type === 'Polygon' && vertices) {
      // Scale the vertices based on the bounding box
      const scaledVertices = vertices.map(vertex => ({
        x: (vertex.x - bounds.minX) * scale,
        y: (vertex.y - bounds.minY) * scale,
      }));

      return {
        type,
        vertices: scaledVertices,
        width: width * scale,
        height: height * scale,
        vertexCount,
        color,
        zIndex,
        x: (x - bounds.minX) * scale, // Adjust polygon's x position
        y: (y - bounds.minY) * scale, // Adjust polygon's y position
      };
    } else {
      return {
        type,
        x: (x - bounds.minX) * scale,
        y: (y - bounds.minY) * scale,
        width: width * scale,
        height: height * scale,
        color,
        zIndex,
      };
    }
  });
};
