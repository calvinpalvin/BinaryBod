import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNutrition: React.FC = () => {
  const navigate = useNavigate();
  const [nutritionData, setNutritionData] = useState({
    userID: '', // Add userID to the initial state
    caloriesEaten: '',
    date: '',
    calGoal: '',
    currentWeight: '',
    goalWeight: '',
    waterIntake: '',
    goalWater: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNutritionData({
      ...nutritionData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set the userID before sending the request
    const nutritionDataWithID = {
      ...nutritionData,
      userID: 10, // Replace with the actual user ID
    };
    axios.post('http://localhost:3000/nutrition/add', nutritionDataWithID)
      .then(response => {
        console.log('Nutrition data added successfully', response);
        // Clear the form or show a success message
        setNutritionData({
          userID: '',
          caloriesEaten: '',
          date: '',
          calGoal: '',
          currentWeight: '',
          goalWeight: '',
          waterIntake: '',
          goalWater: '',
        });
        // Navigate back to /nutrition
        navigate('/nutrition');
      })
      .catch(error => {
        console.error('There was an error adding the nutrition data!', error);
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
      <Typography variant="h5">Add New Nutrition Data</Typography>
      <TextField
        label="Calories Eaten"
        name="caloriesEaten"
        type="number"
        value={nutritionData.caloriesEaten}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={nutritionData.date}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Calorie Goal"
        name="calGoal"
        type="number"
        value={nutritionData.calGoal}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Current Weight"
        name="currentWeight"
        type="number"
        value={nutritionData.currentWeight}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Goal Weight"
        name="goalWeight"
        type="number"
        value={nutritionData.goalWeight}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Water Intake (oz)"
        name="waterIntake"
        type="number"
        value={nutritionData.waterIntake}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Goal Water Intake (oz)"
        name="goalWater"
        type="number"
        value={nutritionData.goalWater}
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

export default AddNutrition;
