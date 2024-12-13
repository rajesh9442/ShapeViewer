export const adjustShapesToFit = (shapes, canvasWidth, canvasHeight) => {
  const bounds = shapes.reduce(
    (acc, { type, x, y, width, height, radius, vertexCount, vertices }) => {
      if (type === 'Circle') {
        acc.minX = Math.min(acc.minX, x - radius);
        acc.minY = Math.min(acc.minY, y - radius);
        acc.maxX = Math.max(acc.maxX, x + radius);
        acc.maxY = Math.max(acc.maxY, y + radius);
      } else if (type === 'Polygon' && vertices) {
        vertices.forEach((vertex) => {
          acc.minX = Math.min(acc.minX, vertex.x);
          acc.minY = Math.min(acc.minY, vertex.y);
          acc.maxX = Math.max(acc.maxX, vertex.x);
          acc.maxY = Math.max(acc.maxY, vertex.y);
        });

        // Set the polygon's center coordinates (x, y)
        x = (acc.minX + acc.maxX) / 2;
        y = (acc.minY + acc.maxY) / 2;
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

  const scaleX = canvasWidth / (bounds.maxX - bounds.minX);
  const scaleY = canvasHeight / (bounds.maxY - bounds.minY);
  const scale = Math.min(scaleX, scaleY);

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
      const scaledVertices = vertices.map(vertex => ({
        x: (vertex.x - bounds.minX) * scale,
        y: (vertex.y - bounds.minY) * scale,
      }));

      // Recalculate the center (x, y) based on the scaled vertices
      x = (bounds.minX + bounds.maxX) / 2 * scale;
      y = (bounds.minY + bounds.maxY) / 2 * scale;

      return {
        type,
        vertices: scaledVertices,
        width: width * scale,
        height: height * scale,
        vertexCount,
        color,
        zIndex,
        x,
        y,
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
