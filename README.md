
The application will be available at `http://localhost:3000`

## Features

- Create, read, update, and delete recipes
- Drag and drop interface for recipe reordering
- Search recipes by title
- Filter recipes by difficulty level
- Sort recipes by last updated date or difficulty
- Share recipes via email
- Pagination support

## Application Structure

- Frontend: React application running on port 3000
- Backend: json-server running on port 3001
- Data: Stored in recipe-app.json file

## Important Notes

- Ensure that json-server version 1.0.0 is installed to avoid compatibility issues
- Both the frontend and backend servers must be running simultaneously for the application to work properly
- The backend server must run on port 3001 as the frontend is configured to communicate with this port

## Troubleshooting

If you encounter any issues:

1. Ensure both servers are running on their respective ports
2. Check that json-server version is 1.0.0
3. Verify that recipe-app.json exists in the root directory
4. Make sure all dependencies are properly installed

## How to use
run the 
- To run the server: npm run start
- To run the json server: json-server --watch recipe-app.json -p 3001
