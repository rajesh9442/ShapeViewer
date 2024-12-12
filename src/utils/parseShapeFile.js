export const parseShapeFile = (fileContent) => {
  const shapes = [];

  // Split the file content by new lines and filter out empty lines
  const lines = fileContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('//')); // Ignore comments and blank lines

  lines.forEach((line) => {
    try {
      // Remove inline comments and anything after the semicolon
      const cleanLine = line.split('//')[0].split(';')[0].trim();

      // Split the line into parts
      const parts = cleanLine.split(',').map((item) => item.trim());

      // Determine shape type and parse accordingly
      const type = parts[0];
      if (type === 'Circle') {
        // Validate and extract Circle-specific fields
        const [x, y, zIndex, radius, color] = parts.slice(1);
        if (!type || isNaN(x) || isNaN(y) || isNaN(zIndex) || isNaN(radius) || !color) {
          console.warn(`Invalid Circle data: ${line}`);
          return; // Skip invalid Circle lines
        }

        shapes.push({
          type,
          x: +x,
          y: +y,
          zIndex: +zIndex,
          radius: +radius,
          color: color.startsWith('#') ? color : `#${color}`, // Ensure color starts with #
        });
      } else if (type === 'Polygon') {
        // Validate and extract Polygon-specific fields
        const [x, y, zIndex, width, height, rotation, vertexCount, color] = parts.slice(1);
        if (!type || isNaN(x) || isNaN(y) || isNaN(zIndex) || isNaN(width) || isNaN(height) || isNaN(rotation) || isNaN(vertexCount) || !color) {
          console.warn(`Invalid Polygon data: ${line}`);
          return; // Skip invalid Polygon lines
        }

        shapes.push({
          type,
          x: +x,
          y: +y,
          zIndex: +zIndex,
          width: +width,
          height: +height,
          rotation: +rotation,
          vertexCount: +vertexCount,
          color: color.startsWith('#') ? color : `#${color}`, // Ensure color starts with #
        });
      } else {
        // Validate and extract general shape fields
        const [x, y, zIndex, width, height, color] = parts.slice(1);
        if (!type || isNaN(x) || isNaN(y) || isNaN(zIndex) || isNaN(width) || isNaN(height) || !color) {
          console.warn(`Invalid shape data: ${line}`);
          return; // Skip invalid lines
        }

        shapes.push({
          type,
          x: +x,
          y: +y,
          zIndex: +zIndex,
          width: +width,
          height: +height,
          color: color.startsWith('#') ? color : `#${color}`, // Ensure color starts with #
        });
      }
    } catch (error) {
      console.error(`Error parsing line: "${line}"`, error);
    }
  });

  return shapes;
};
