import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const AddWorkout: React.FC = () => {
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState({
    workoutID: '', // Add workoutID to the initial state
    userID: '', // Add userID to the initial state
    workoutName: '',
    muscleGroup: '',
    experienceLevel: '',
    duration: '',
    equipmentNeeded: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set the workoutID and userID before sending the request
    const workoutDataWithIDs = {
      ...workoutData,
      // workoutID: 20, // Set the workout ID
      userID: 10, // Replace with the actual user ID
    };
    axios.post('http://localhost:3000/workout/add', workoutDataWithIDs)
      .then(response => {
        console.log('Workout added successfully', response);
        // Clear the form or show a success message
        setWorkoutData({
          workoutID: '',
          userID: '',
          workoutName: '',
          muscleGroup: '',
          experienceLevel: '',
          duration: '',
          equipmentNeeded: '',
        });
        // Navigate back to /workouts
        navigate('/workouts');
      })
      .catch(error => {
        console.error('There was an error adding the workout!', error);
      });
  };

  const experienceLevels = [
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
      <Typography variant="h5">Add New Workout</Typography>
      <TextField
        label="Workout Name"
        name="workoutName"
        value={workoutData.workoutName}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Muscle Group"
        name="muscleGroup"
        value={workoutData.muscleGroup}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        select
        label="Experience Level"
        name="experienceLevel"
        value={workoutData.experienceLevel}
        onChange={handleChange}
        required
        fullWidth
      >
        {experienceLevels.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Duration (minutes)"
        name="duration"
        type="number"
        value={workoutData.duration}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Equipment Needed"
        name="equipmentNeeded"
        value={workoutData.equipmentNeeded}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddWorkout;
