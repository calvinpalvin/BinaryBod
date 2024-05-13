import { Router } from 'express';
import { Pool } from 'mysql';

// Function to create and return the router
export const createRoutes = (dbPool: Pool): Router => {
    const router = Router();

    // Define a route
    router.get('/data', (req, res) => {
        dbPool.query('SELECT * FROM exercises', (error, results) => {
            if (error) {
                console.error('Database query failed:', error);  // Log the error object
                res.status(500).send('Database query error');
                return;
            }
            res.send(results);
        });
    });
    

    // More routes can be added here
    return router;
};
export default createRoutes;