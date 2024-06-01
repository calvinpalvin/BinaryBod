import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useUser } from './UserContext';
import Box from '@mui/material/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  workoutID: number,
  workoutName: string,
  muscleGroup: string,
  experienceLevel: string,
  duration: number,
  equipmentNeeded: string,
) {
  return { workoutID, workoutName, muscleGroup, experienceLevel, duration, equipmentNeeded };
}

const Workouts: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/workout_info/${user.id}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);

  const rows = data.map((workout: { Workout_ID: number; Workout_Name: string; Muscle_Group: string; Experience_Level: string; Duration: number; Equipment_Needed: string; }) => 
    createData(workout.Workout_ID, workout.Workout_Name, workout.Muscle_Group, workout.Experience_Level, workout.Duration, workout.Equipment_Needed)
  );

  if (!user) {
    return (
      <Typography variant="h6" align="center">
      Please <Link to="/"> sign in</Link> to view your workouts.
      </Typography>
    );
  }

  const handleRowClick = (workoutID: number) => {
    navigate(`/exercises/${workoutID}`);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Users Workouts
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button 
          variant="contained" 
          component={Link} 
          to="/workout/add" 
          style={{ backgroundColor: 'cyan', color: '#000000' }}
          sx={{ my: 1 }}
        >
            Add Workouts
      </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Workout ID</StyledTableCell>
              <StyledTableCell align="right">Workout Name</StyledTableCell>
              <StyledTableCell align="right">Muscle Group</StyledTableCell>
              <StyledTableCell align="right">Experience Level</StyledTableCell>
              <StyledTableCell align="right">Duration</StyledTableCell>
              <StyledTableCell align="right">Equipment Needed</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.workoutID} onClick={() => handleRowClick(row.workoutID)} style={{ cursor: 'pointer' }}>
                 <StyledTableCell component="th" scope="row">{row.workoutID}</StyledTableCell>
                 <StyledTableCell align="right">{row.workoutName}</StyledTableCell>
                <StyledTableCell align="right">{row.muscleGroup}</StyledTableCell>
                <StyledTableCell align="right">{row.experienceLevel}</StyledTableCell>
                <StyledTableCell align="right">{row.duration}</StyledTableCell>
                <StyledTableCell align="right">{row.equipmentNeeded}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default Workouts;
