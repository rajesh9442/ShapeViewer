import React from "react";

const ShapeViewport = ({ shapes }) => {
  return (
    <div className="shape-viewport" style={{ position: "relative" }}>
      {shapes.map((shape, index) => {
        // Handling the "Rectangle" shape
        if (shape.type === "Rectangle") {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                backgroundColor: shape.color,
                zIndex: shape.zIndex,
              }}
            />
          );
        }

        // You can add logic here to render other shape types (e.g., Circle, Triangle)
        // Example for a "Circle":
        if (shape.type === "Circle") {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                width: `${shape.width}px`,
                height: `${shape.width}px`, // Circle's width is equal to height
                backgroundColor: shape.color,
                borderRadius: "50%", // This makes it a circle
                zIndex: shape.zIndex,
              }}
            />
          );
        }

        // Example for a "Triangle":
        if (shape.type === "Triangle") {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                width: 0,
                height: 0,
                borderLeft: `${shape.width / 2}px solid transparent`,
                borderRight: `${shape.width / 2}px solid transparent`,
                borderBottom: `${shape.height}px solid ${shape.color}`,
                zIndex: shape.zIndex,
              }}
            />
          );
        }

        // Return null if no shape type matches
        return null;
      })}
    </div>
  );
};

export default ShapeViewport;
