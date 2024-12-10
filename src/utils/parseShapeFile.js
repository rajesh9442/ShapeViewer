export const parseShapeFile = (fileContent) => {
  const shapes = [];
  const lines = fileContent.split('\n').filter(line=>line.trim() !== '');  // Split by semicolon to separate shapes
  
  lines.forEach((line) => {
    const[type,x,y,zIndex,width,height,color]=line.split(',').map(item=>item.trim());
    shapes.push({type,x:+x,y:+y,zIndex:+zIndex,width:+width,height:+height,color});
  });
  debugger;
  return shapes;
};
