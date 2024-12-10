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

      // Extract shape properties
      const [type, x, y, zIndex, width, height, color] = cleanLine
        .split(',')
        .map((item) => item.trim());
      
      // Validate required fields
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
    } catch (error) {
      console.error(`Error parsing line: "${line}"`, error);
    }
  });

  return shapes;
};
