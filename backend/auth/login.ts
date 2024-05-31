import { Router } from 'express';
import { Pool } from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

export const createLoginRoutes = (dbPool: Pool): Router => {
    const router = Router();

    // POST route to login a user
    router.post('/login', (req, res) => {
        const { username, password } = req.body;

        // Validate the request body
        if (!username || !password) {
            return res.status(400).send('Missing required parameters');
        }

        // Query to find the user by username
        const userQuery = 'SELECT * FROM user_info WHERE Username = ?';

        dbPool.query(userQuery, [username], async (userError, userResults) => {
            if (userError) {
                console.error('Failed to fetch user:', userError);
                return res.status(500).send('Failed to fetch user');
            }

            if (userResults.length === 0) {
                return res.status(401).send('Invalid username');
            }

            const user = userResults[0];

            // Query to get the user's password hash
            const passwordQuery = 'SELECT PasswordHash FROM passwords WHERE UserID = ?';

            dbPool.query(passwordQuery, [user.UserID], async (passwordError, passwordResults) => {
                if (passwordError) {
                    console.error('Failed to fetch password:', passwordError);
                    return res.status(500).send('Failed to fetch password');
                }

                if (passwordResults.length === 0) {
                    return res.status(401).send('Invalid password');
                }

                const storedHash = passwordResults[0].PasswordHash;

                // Compare the provided password with the stored hash
                const isMatch = await bcrypt.compare(password, storedHash);

                if (!isMatch) {
                    return res.status(401).send('Invalid password');
                }

                // Generate a new JWT token
                const token = jwt.sign({ userID: user.UserID, username: user.Username }, SECRET_KEY, { expiresIn: '1h' });

                res.status(200).json({ message: 'Login successful', token, userID: user.UserID});
            });
        });
    });

    return router;
};

export default createLoginRoutes;
