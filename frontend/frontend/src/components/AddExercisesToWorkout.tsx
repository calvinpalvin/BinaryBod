import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';

const AddExercisesToWorkout: React.FC = () => {
  const navigate = useNavigate();
  const { workoutID } = useParams<{ workoutID: string }>();
  const [exercises, setExercises] = useState<any[]>([]);
  const [selectedExerciseName, setSelectedExerciseName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/exercise_info')
      .then(response => {
        setExercises(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching exercises!', error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedExerciseName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected exerciseName:', selectedExerciseName);

    // Add the exercise to the workout
    axios.post(`http://localhost:3000/workout/${workoutID}/add-exercise`, {
      exerciseName: selectedExerciseName
    })
      .then(response => {
        console.log('Exercise added to workout successfully', response);
        navigate(`/exercises/${workoutID}`);
      })
      .catch(error => {
        console.error('There was an error adding the exercise to the workout!', error);
        console.log('Error details:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 4,
        p: 2,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 3,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5">Add Existing Exercise to Workout {workoutID}</Typography>
      <TextField
        select
        label="Select Exercise"
        value={selectedExerciseName}
        onChange={handleChange}
        required
        fullWidth
      >
        {exercises.map((exercise) => (
          <MenuItem key={exercise.Exercise_ID} value={exercise.Exercise_Name}>
            {exercise.Exercise_Name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddExercisesToWorkout;
