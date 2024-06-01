import { Router } from 'express';
import { Pool } from 'mysql';
import createRegisterRoutes from './auth/register';
import createLoginRoutes from './auth/login';

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
    
    router.use(createRegisterRoutes(dbPool)); // Use the register route
    router.use(createLoginRoutes(dbPool)); // Use the login route
    // More routes can be added here

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
            // exerciseID,
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
            INSERT INTO exercises (Exercise_Name, Workout_ID, Muscle_Group, Experience_Level, Recommended_Sets_Reps, Equipment_Needed)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        dbPool.query(query, [
            // exerciseID,
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

    router.post('/workout/:workoutID/add-exercise', (req, res) => {
        const { workoutID } = req.params; // Extract workoutID from URL parameters
        const { exerciseName } = req.body; // Extract exerciseName from request body
      
        console.log('Received workoutID:', workoutID);
        console.log('Received exerciseName:', exerciseName);
      
        if (!workoutID || !exerciseName) {
          console.log('Missing required parameters');
          return res.status(400).send('Missing required parameters');
        }
      
        // Query to get the exercise details based on the exerciseName
        const getExerciseQuery = 'SELECT * FROM exercises WHERE Exercise_Name = ?';
      
        dbPool.query(getExerciseQuery, [exerciseName], (error, results) => {
          if (error) {
            console.error('Failed to find exercise:', error);
            return res.status(500).send('Failed to find exercise');
          }
      
          if (results.length === 0) {
            console.log('Exercise not found');
            return res.status(404).send('Exercise not found');
          }
      
          const exercise = results[0];
      
          console.log('Found exercise:', exercise);
      
          // Insert the exercise details into the exercises table with the specified workoutID
          const insertQuery = `
            INSERT INTO exercises (Workout_ID, Exercise_Name, Muscle_Group, Experience_Level, Recommended_Sets_Reps, Equipment_Needed)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
      
          dbPool.query(insertQuery, [
            workoutID,
            exercise.Exercise_Name,
            exercise.Muscle_Group,
            exercise.Experience_Level,
            exercise.Recommended_Sets_Reps,
            exercise.Equipment_Needed
          ], (insertError, insertResults) => {
            if (insertError) {
              console.error('Failed to add exercise to workout:', insertError);
              return res.status(500).send('Failed to add exercise to workout');
            }
            res.status(201).send('Exercise added to workout successfully');
          });
        });
      });
      
      
      
    // Route to get user info
    router.get('/user_info/:userID', (req, res) => {
        const query = `SELECT * FROM user_info WHERE UserID = ?`;
        const userID = req.params.userID;

        dbPool.query(query, [userID], (error, results) => {
            if (error) {
                console.error('Failed to get all info from User', error);
                return res.status(500).send('Failed to get all info from User');
            }
            // res.send(results);
            res.status(200).json(results);
        });
    });

        
    // Route to get workout info
    router.get('/workout_info/:userID', (req, res) => {
        const query = 'SELECT * FROM workouts WHERE UserID = ?';
        const userID = req.params.userID;
    
        dbPool.query(query, [userID], (error, results) => {
            if (error) {
                console.error('Failed to get workout info for User', error);
                return res.status(500).send('Failed to get workout info for User');
            }
            res.send(results);
            res.status(200);
        });
    });
    
    
    // Route to get exercise info
    router.get('/exercise_info/', (req, res) => {
        const query = `
            SELECT e.* 
            FROM exercises e
            `;

    
        dbPool.query(query, (error, results) => {
            if (error) {
                console.error('Failed to get exercise info for User', error);
                return res.status(500).send('Failed to get exercise info for User');
            }
            res.send(results);
            res.status(200);
        });
    });

   
    
    router.get('/exercises/:workoutID', (req, res) => {
        const query = 'SELECT * FROM exercises WHERE Workout_ID = ?';
        const workoutID = req.params.workoutID;
        dbPool.query(query, [workoutID], (error, results) => {
            if (error) {
                console.error('Failed to get exercises for workout:', error);
                return res.status(500).send('Failed to get exercises for workout');
            }
            res.send(results);
        });
    });
    
    // Route to get nutrition info
    router.get('/nutrition_info/:userID', (req, res) => {
        const query = 'SELECT * FROM nutrition_water WHERE UserID = ?';
        const userID = req.params.userID;

    
        dbPool.query(query, [userID], (error, results) => {
            if (error) {
                console.error('Failed to get nutrition info for User', error);
                return res.status(500).send('Failed to get nutrition info for User');
            }
            res.send(results);
            res.status(200);
        });
    });
    


    return router;
};
export default createRoutes;