import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const AddExercises: React.FC = () => {
  const navigate = useNavigate();
  const [exerciseData, setExerciseData] = useState({
    // exerciseID: '', // Add exerciseID to the initial state
    workoutID: '', // Add workoutID to the initial state
    exerciseName: '',
    muscleGroup: '',
    difficultyLevel: '',
    sets: '',
    reps: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set the exerciseID and userID before sending the request
    const exerciseDataWithIDs = {
      ...exerciseData,
    //   exerciseID: 26, // Set the exercise ID
      workoutID: 11, // Set the workoutID 
    };
    axios.post('http://localhost:3000/exercises/add', exerciseDataWithIDs)
      .then(response => {
        console.log('Exercise added successfully', response);
        // Clear the form or show a success message
        setExerciseData({
        //   exerciseID: '',
          workoutID: '', 
          exerciseName: '',
          muscleGroup: '',
          difficultyLevel: '',
          sets: '',
          reps: '',
        });
        // Navigate back to /exercises
        navigate('/exercises');
      })
      .catch(error => {
        console.error('There was an error adding the exercise!', error);
      });
  };

  const difficultyLevels = [
    {
      value: 'Beginner',
      label: 'Beginner',
    },
    {
      value: 'Intermediate',
      label: 'Intermediate',
    },
    {
      value: 'Advanced',
      label: 'Advanced',
    },
  ];

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
      <Typography variant="h5">Add New Exercise</Typography>
      <TextField
        label="Exercise Name"
        name="exerciseName"
        value={exerciseData.exerciseName}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Muscle Group"
        name="muscleGroup"
        value={exerciseData.muscleGroup}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        select
        label="Difficulty Level"
        name="difficultyLevel"
        value={exerciseData.difficultyLevel}
        onChange={handleChange}
        required
        fullWidth
      >
        {difficultyLevels.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Sets"
        name="sets"
        type="number"
        value={exerciseData.sets}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Reps"
        name="reps"
        type="number"
        value={exerciseData.reps}
        onChange={handleChange}
        required
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddExercises;
