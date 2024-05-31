import { Router } from 'express';
import { Pool } from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

export const createRoutes = (dbPool: Pool): Router => {
    const router = Router();

    // POST route to register a user
    router.post('/register', async (req, res) => {
        const {
            username,
            password,
            fName,
            lName,
            email,
            dob,
            weight,
            gender
        } = req.body;

        // Validate the request body
        if (!username || !password || !fName || !lName || !email || !dob || !weight || !gender) {
            return res.status(400).send('Missing required parameters');
        }

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into user_info table
            const userQuery = `
                INSERT INTO user_info (Username, Fname, Lname, Email, DOB, Weight, Gender)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;

            dbPool.query(userQuery, [username, fName, lName, email, dob, weight, gender], (userError, userResults) => {
                if (userError) {
                    console.error('Failed to add user:', userError);
                    return res.status(500).send('Failed to add user');
                }

                const userID = userResults.insertId;

                // Insert password into passwords table
                const passwordQuery = `
                    INSERT INTO passwords (UserID, PasswordHash)
                    VALUES (?, ?)
                `;

                dbPool.query(passwordQuery, [userID, hashedPassword], (passwordError, passwordResults) => {
                    if (passwordError) {
                        console.error('Failed to add password:', passwordError);
                        return res.status(500).send('Failed to add password');
                    }

                    // Generate a JWT token
                    const token = jwt.sign({ userID, username }, SECRET_KEY, { expiresIn: '1h' });

                    res.status(201).json({ message: 'User registered successfully', token });
                });
            });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('Error during registration');
        }
    });

    return router;
};

export default createRoutes;
