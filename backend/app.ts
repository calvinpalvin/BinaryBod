import express from 'express';
import cors from 'cors'; // Import cors
import { initializeDatabase } from './db';
import { createRoutes } from './routes'; // Import the function to create routes

const app = express();
const port = 3000;
const dbPool = initializeDatabase(); // Initialize the database connection pool

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

// Initialize routes with the dbPool and use them with your app
const routes = createRoutes(dbPool);
app.use(routes); // Apply the routes to the Express application with a base path

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
