// utils/adjustShapes.js
export const adjustShapesToFit = (shapes, canvasWidth, canvasHeight) => {
    const bounds = shapes.reduce(
      (acc, { x, y, width, height }) => {
        acc.minX = Math.min(acc.minX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxX = Math.max(acc.maxX, x + width);
        acc.maxY = Math.max(acc.maxY, y + height);
        return acc;
      },
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );
  
    const scaleX = canvasWidth / (bounds.maxX - bounds.minX);
    const scaleY = canvasHeight / (bounds.maxY - bounds.minY);
    const scale = Math.min(scaleX, scaleY);
  
    return shapes.map(({ type, x, y, width, height, color, zIndex }) => ({
      type,
      x: (x - bounds.minX) * scale,
      y: (y - bounds.minY) * scale,
      width: width * scale,
      height: height * scale,
      color,
      zIndex,
    }));
  };
  