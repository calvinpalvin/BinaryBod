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
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useUser } from './UserContext';

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
  // hide last border
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

  return (
    <div>
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
            {rows.map((row: { workoutID: number; workoutName: string; muscleGroup: string; experienceLevel: string; duration: string | number; equipmentNeeded: string; }) => (
              <StyledTableRow key={row.workoutID}>
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

      <Button variant="contained" component={Link} to="/workout/add">
        Add Workout
      </Button>
    </div>
  );
}

export default Workouts;
