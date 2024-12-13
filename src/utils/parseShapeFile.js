export const parseShapeFile = (fileContent, newShape = null) => {
  const shapes = [];

  if (fileContent) {
    // Split the file content by new lines and filter out empty lines and comments
    const lines = fileContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '' && !line.startsWith('//')); // Ignore comments and blank lines

    // Parsing existing shapes in the file
    lines.forEach((line, index) => {
      try {
        // Remove inline comments and anything after the semicolon
        const cleanLine = line.split('//')[0].split(';')[0].trim();

        // Split the line into parts
        const parts = cleanLine.split(',').map((item) => item.trim());

        if (parts[0].includes('[object File]')) {
          parts[0] = parts[0].replace('[object File]', '').trim();
        }

        const type = parts[0];
        let shape = null;

        if (type === 'Circle') {
          // Validate and extract Circle-specific fields
          const [x, y, zIndex, radius, color] = parts.slice(1);
          if (isNaN(x) || isNaN(y) || isNaN(zIndex) || isNaN(radius) || !color) {
            console.warn(`Invalid Circle data (line ${index + 1}): ${line}`);
          } else {
            shape = {
              type,
              x: +x,
              y: +y,
              zIndex: +zIndex,
              radius: +radius,
              color: color.startsWith('#') ? color : `#${color}`,
            };
          }
        } else if (type === 'Polygon') {
          // Validate and extract Polygon-specific fields
          const [x, y, zIndex, width, height, rotation, vertexCount, color] = parts.slice(1);
          if (isNaN(x) || isNaN(y) || isNaN(zIndex) || isNaN(width) || isNaN(height) || isNaN(rotation) || isNaN(vertexCount) || !color) {
            console.warn(`Invalid Polygon data (line ${index + 1}): ${line}`);
          } else {
            shape = {
              type,
              x: +x,
              y: +y,
              zIndex: +zIndex,
              width: +width,
              height: +height,
              rotation: +rotation,
              vertexCount: +vertexCount,
              color: color.startsWith('#') ? color : `#${color}`,
            };
          }
        } else {
          // Validate and extract general shape fields
          const [x, y, zIndex, width, height, color] = parts.slice(1);
          if (isNaN(x) || isNaN(y) || isNaN(zIndex) || isNaN(width) || isNaN(height) || !color) {
            console.warn(`Invalid shape data (line ${index + 1}): ${line}`);
          } else {
            shape = {
              type,
              x: +x,
              y: +y,
              zIndex: +zIndex,
              width: +width,
              height: +height,
              color: color.startsWith('#') ? color : `#${color}`,
            };
          }
        }

        // Add valid shape to the list
        if (shape) {
          shapes.push(shape);
        }

      } catch (error) {
        console.error(`Error parsing line ${index + 1}: "${line}"`, error);
      }
    });
  }

  // Append new shape data if provided
  if (newShape) {
    // Check if the newShape already exists
    const shapeExists = shapes.some(
      (shape) =>
        shape.type === newShape.type &&
        shape.x === newShape.x &&
        shape.y === newShape.y &&
        shape.zIndex === newShape.zIndex &&
        shape.radius === newShape.radius &&
        shape.color === newShape.color
    );

    if (!shapeExists) {
      shapes.push(newShape); // Append the new shape if not a duplicate
    }
  }

  return shapes;
};
