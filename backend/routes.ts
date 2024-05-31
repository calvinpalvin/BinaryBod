import { Router } from 'express';
import { Pool } from 'mysql';
import createRegisterRoutes from './auth/register';

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
    
    router.use(createRegisterRoutes(dbPool)); // Use the register route
                                            // add in login route
    // More routes can be added here
    return router;
};
export default createRoutes;