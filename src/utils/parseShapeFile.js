export const parseShapeFile = (fileContent, newShape = null) => {
  const shapes = [];

  if (fileContent) {
    const lines = fileContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '' && !line.startsWith('//')); // Ignore comments and empty lines

    lines.forEach((line, index) => {
      try {
        const cleanLine = line.split('//')[0].split(';')[0].trim();
        const parts = cleanLine.split(',').map((item) => item.trim());

        if (parts[0].includes('[object File]')) {
          parts[0] = parts[0].replace('[object File]', '').trim();
        }

        const type = parts[0];
        let shape = null;

        // Helper function to validate if a number is valid and non-negative
        const validateNumber = (value) => {
          const num = parseFloat(value);
          return !isNaN(num) && num >= 0;
        };

        if (type === 'Circle') {
          const [x, y, zIndex, radius, color, rotation] = parts.slice(1);
          if (!validateNumber(x) || !validateNumber(y) || !validateNumber(zIndex) || !validateNumber(radius) || !color) {
            console.warn(`Invalid Circle data (line ${index + 1}): ${line}`);
          } else {
            shape = {
              type,
              x: +x,
              y: +y,
              zIndex: +zIndex,
              radius: +radius,
              color: color.startsWith('#') ? color : `#${color}`,
              rotation: rotation ? parseFloat(rotation) : 0, // Default to 0 if no rotation is provided
            };
          }
        } else if (type === 'Polygon') {
          const [x, y, zIndex, width, height, vertexCount, color, rotation] = parts.slice(1);
          if (!validateNumber(x) || !validateNumber(y) || !validateNumber(zIndex) || !validateNumber(width) || !validateNumber(height) || !validateNumber(vertexCount) || !color) {
            console.warn(`Invalid Polygon data (line ${index + 1}): ${line}`);
          } else {
            shape = {
              type,
              x: +x,  // Ensure x is correctly parsed
              y: +y,  // Ensure y is correctly parsed
              zIndex: +zIndex,
              width: +width,
              height: +height,
              vertexCount: +vertexCount,
              color: color.startsWith('#') ? color : `#${color}`,
              rotation: rotation ? parseFloat(rotation) : 0, // Default to 0 if no rotation is provided
              vertices: generatePolygonVertices(+width, +height, +vertexCount), // Generate the vertices
            };
          }
        } else {
          const [x, y, zIndex, width, height, color, rotation] = parts.slice(1);
          if (!validateNumber(x) || !validateNumber(y) || !validateNumber(zIndex) || !validateNumber(width) || !validateNumber(height) || !color) {
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
              rotation: rotation ? parseFloat(rotation) : 0, // Default to 0 if no rotation is provided
            };
          }
        }

        if (shape) {
          shapes.push(shape);
        }

      } catch (error) {
        console.error(`Error parsing line ${index + 1}: "${line}"`, error);
      }
    });
  }

  if (newShape) {
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
      shapes.push(newShape);
    }
  }

  return shapes;
};

// Function to generate vertices for polygon based on width, height, and number of sides
const generatePolygonVertices = (width, height, vertexCount) => {
  const vertices = [];
  const angleStep = (2 * Math.PI) / vertexCount;

  for (let i = 0; i < vertexCount; i++) {
    const angle = i * angleStep;
    const x = width / 2 * Math.cos(angle); // Scale based on width
    const y = height / 2 * Math.sin(angle); // Scale based on height
    vertices.push({ x, y });
  }

  return vertices;
};
