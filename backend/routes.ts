import { Router } from 'express';
import { Pool } from 'mysql';

// Function to create and return the router
export const createRoutes = (dbPool: Pool): Router => {
    const router = Router();

    // Tester route
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
    

    // POST route to add a workout
    router.post('/workout/add', (req, res) => {
        const { workoutID, userID, workoutName, muscleGroup, experienceLevel, duration, equipmentNeeded } = req.body;
        if (!userID || !workoutName || !muscleGroup || !experienceLevel || !duration) {
            return res.status(400).send('Missing required parameters');
        }
         // Generate unique ID for workout
        const query = 'INSERT INTO workouts (Workout_ID, UserID, Workout_Name, Muscle_Group, Experience_Level, Duration, Equipment_Needed) VALUES (?, ?, ?, ?, ?, ?, ?)';

        dbPool.query(query, [workoutID, userID, workoutName, muscleGroup, experienceLevel, duration, equipmentNeeded], (error, results) => {
            if (error) {
                console.error('Failed to add workout:', error);
                return res.status(500).send('Failed to add workout');
            }
            res.status(201).send(`Workout added successfully with ID ${workoutID}`);
        });
    });

    // POST route to add nutrition information
    router.post('/nutrition/add', (req, res) => {
        const { userID, caloriesEaten, date, calGoal, currentWeight, goalWeight, waterIntake, goalWater } = req.body;
        if (!userID || !date || !caloriesEaten || !calGoal) {
            return res.status(400).send('Missing required parameters');
        }

        console.log('Received values:', {
            userID,
            date,
            caloriesEaten,
            calGoal,
            currentWeight,
            goalWeight,
            waterIntake,
            goalWater
        });

        const query = `
            INSERT INTO nutrition_water (UserID, Calories_Eaten, Date, Calorie_Goal, Current_Weight, Goal_Weight, Water_Drank_oz, Goal_Water_Intake)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        dbPool.query(query, [userID, caloriesEaten, date, calGoal, currentWeight, goalWeight, waterIntake, goalWater], (error, results) => {
            if (error) {
                console.error('Failed to add nutrition info:', error);
                return res.status(500).send('Failed to add nutrition info');
            }
            res.status(201).send('Nutrition info added successfully');
        });
    });

    // POST route to add exercises
    router.post('/exercises/add', (req, res) => {
        const {
            exerciseID,
            exerciseName,
            workoutID,
            muscleGroup,
            experienceLevel,
            recommendedSetsReps,
            equipmentNeeded
        } = req.body;

        // Validate the request body
        if (!exerciseName || !workoutID || !muscleGroup || !experienceLevel || !recommendedSetsReps) {
            return res.status(400).send('Missing required parameters');
        }

        const query = `
            INSERT INTO exercises (Exercise_ID, Exercise_Name, Workout_ID, Muscle_Group, Experience_Level, Recommended_Sets_Reps, Equipment_Needed)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        dbPool.query(query, [
            exerciseID,
            exerciseName,
            workoutID,
            muscleGroup,
            experienceLevel,
            recommendedSetsReps,
            equipmentNeeded
        ], (error, results) => {
            if (error) {
                console.error('Failed to add exercise:', error);
                return res.status(500).send('Failed to add exercise');
            }
            res.status(201).send('Exercise added successfully');
        });
    });


    return router;
};
export default createRoutes;