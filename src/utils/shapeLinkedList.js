// src/utils/shapeLinkedList.js

class ShapeNode {
    constructor(shape) {
      this.shape = shape;
      this.next = null;
    }
  }
  
  class ShapeList {
    constructor() {
      this.head = null;
    }
  
    // Insert shapes in sorted order based on zIndex
    insert(shape) {
      const newNode = new ShapeNode(shape);
  
      // If list is empty or new shape has a smaller zIndex than head, insert at the start
      if (!this.head || this.head.shape.zIndex > shape.zIndex) {
        newNode.next = this.head;
        this.head = newNode;
        return;
      }
  
      // Traverse the list and find the correct position based on zIndex
      let current = this.head;
      while (current.next && current.next.shape.zIndex <= shape.zIndex) {
        current = current.next;
      }
  
      // Insert the new shape after the found node
      newNode.next = current.next;
      current.next = newNode;
    }
  
    // Update the shape based on zIndex (or any other unique identifier)
    update(updatedShape) {
      let current = this.head;
      while (current) {
        if (current.shape.zIndex === updatedShape.zIndex) {
          current.shape = updatedShape; // Update the shape
          return;
        }
        current = current.next;
      }
    }
  
    // Convert linked list to an array for rendering
    toArray() {
      const shapesArray = [];
      let current = this.head;
      while (current) {
        shapesArray.push(current.shape);
        current = current.next;
      }
      return shapesArray;
    }
  }
  
  export { ShapeList };
  