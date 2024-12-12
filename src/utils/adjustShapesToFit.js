export const adjustShapesToFit = (shapes, canvasWidth, canvasHeight) => {
  const bounds = shapes.reduce(
    (acc, { type, x, y, width, height, radius, vertexCount, rotation }) => {
      if (type === 'Circle') {
        // Adjust bounds for Circle using its radius
        acc.minX = Math.min(acc.minX, x - radius);
        acc.minY = Math.min(acc.minY, y - radius);
        acc.maxX = Math.max(acc.maxX, x + radius);
        acc.maxY = Math.max(acc.maxY, y + radius);
      } else {
        // Adjust bounds for Rectangle, Triangle, and Polygon
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

  return shapes.map(({ type, x, y, width, height, radius, vertexCount, rotation, color, zIndex }) => {
    if (type === 'Circle') {
      // Adjust Circle properties
      return {
        type,
        x: (x - bounds.minX) * scale,
        y: (y - bounds.minY) * scale,
        radius: radius * scale,
        color,
        zIndex,
      };
    } else if (type === 'Polygon') {
      // Adjust Polygon properties
      return {
        type,
        x: (x - bounds.minX) * scale,
        y: (y - bounds.minY) * scale,
        width: width * scale,
        height: height * scale,
        vertexCount,
        rotation, // Include rotation
        color,
        zIndex,
      };
    } else {
      // Adjust Rectangle and Triangle properties
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
