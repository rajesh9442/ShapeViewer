const parseShapeFile = (content) => {
  const shapes = [];
  const lines = content.split(";");  // Split by semicolon to separate shapes
  
  lines.forEach((line) => {
    if (line.trim().startsWith("//") || line.trim() === "") return; // Skip comments or empty lines

    const cleanLine = line.split("//")[0].trim();  // Clean comments
    const parts = cleanLine.split(",");  // Split by commas to get shape properties

    if (parts.length < 7) return; // Ensure enough data exists for the shape

    const type = parts[0].trim();
    const x = parseInt(parts[1].trim(), 10);
    const y = parseInt(parts[2].trim(), 10);
    const zIndex = parseInt(parts[3].trim(), 10);
    const width = parseInt(parts[4].trim(), 10);
    const height = parseInt(parts[5].trim(), 10);
    const color = `#${parts[6].trim()}`;

    shapes.push({
      type,
      x,
      y,
      width,
      height,
      color,
      zIndex,
    });
  });

  return shapes;
};
