# SHAPE VIEWER

#### 1) Open the Project:
        • After cloning or extracting the project, open the application folder in VS Code or your preferred code editor.
        • GitHub link : https://github.com/rajesh9442/ShapeViewer

#### 2) Install Dependencies:
        • Run the following command in the terminal to install the required Node modules:
                    npm install

#### 3) Start the Application:
        • Launch the application using:
                    npm start
        • The application will start running in your default web browser.

### Alternatively:
        • You can directly view the hosted version of the application by clicking this link:
            [ShapeViewer](https://shape-viewer-seven.vercel.app/)

            
## Application Features
#### 1) Upload Shape File
        • Click the "Open Shape File" button to upload your file.
        • Supported File Extensions: .txt, .shapefile
        • File Format Example:

            //Each shape should be in a new line:
            Rectangle, 0, 0, 2, 50, 50, ff0000, 73; // type, x, y, z-index, width, height, color, rotation (optional)
            Circle, 500, 100, 3, 150, 0000ff;      // type, x, y, z-index, radius, color, rotation (optional)
            Triangle, 3, 30, 7, 50, 30, 0000ff;    // type, x, y, z-index, width, height, color, rotation (optional)
            Polygon, 500, 70, 4, 100, 20, 7, #00a0ff, 46; // x, y, z, width, height, sides, color, rotation (optional)

        # Currently Supported Shapes:
        • Rectangle, Circle, Triangle, and Polygon.
        # Multiple File Uploads:
        • You can upload multiple files by clicking the "Open Shape File" button again.

#### 2) Create New Shape
        • After uploading a file, click the "Create New Shape" button to add new shapes.
        # Shape Options:
        • Select the desired shape type: Rectangle, Circle, Triangle, or Polygon.
        • Fill in the required input fields based on the shape type.

#### 3) Save Changes
        • After creating new shapes, click the "Save Changes" button in the top toolbar.
        • Note: The new shapes will be added to the current file and saved as new file.


## Additional Information
#### 1) Iterations Completed
        • Iteration 1 : User Interface Layout
        • Iteration 2 : Shape File
        • Iteration 3 : Shape Rendering
        • Iteration 4 : Polygon Support
        • Iteration 5 : UI Enhancement

#### 2) Bonus Features Completed
        • Bonus Feature 2 : Shape Creation
        • Bonus Feature 3 : Shape Rotation

#### 3) Extra Features Completed
       ** • Multiple File uploads :** Users can upload multiple shape files and seamlessly view or manage shapes from all uploaded files.
        **• Auto Adjust Screen Size for Bigger Values :** The application automatically adjusts the viewport and rendering canvas size to accommodate shapes with larger coordinate values, ensuring all shapes fit within the viewable area.



## Performance Optimization
        To enhance the efficiency of handling and rendering shapes, the LinkedList data structure has been utilized. This approach provides the following benefits:

#### 1) Efficient Insertion by Z-Index:
        • New shapes are inserted into the data structure based on their z-index. This ensures that the list remains sorted for rendering, eliminating the need for additional sorting operations during rendering.

#### 2) Optimized Rendering for Large Datasets:
        • By maintaining a sorted structure, rendering operations become faster and more efficient, allowing the application to handle and display thousands of shapes seamlessly.

#### 3) Scalability:
        • This optimization makes the application capable of efficiently managing and rendering many shapes, ensuring smooth performance even with extensive datasets.





