import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
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
  exerciseName: string,
  muscleGroup: string,
  experienceLevel: string,
  setsReps: string,
  equipmentNeeded: string,
) {
  return { exerciseName, muscleGroup, experienceLevel, setsReps, equipmentNeeded };
}

const Exercises: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/exercise_info/`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);

  const rows = data.map((exercise: { Exercise_Name: string; Muscle_Group: string; Experience_Level: string; Recommended_Sets_Reps: string; Equipment_Needed: string; }) => 
    createData(exercise.Exercise_Name, exercise.Muscle_Group, exercise.Experience_Level, exercise.Recommended_Sets_Reps, exercise.Equipment_Needed)
  );

  if (!user) {
    return (
      <Typography variant="h6" align="center">
      Please <Link to="/"> sign in</Link> to view your exercises.
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Available Exercises Currently
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/exercises/add" 
            style={{ backgroundColor: 'cyan', color: '#000000' }}
            sx={{ my: 1 }}
          >
            Add New Exercise
          </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
      
          <TableHead>
            <TableRow>
              <StyledTableCell>Exercise Name</StyledTableCell>
              <StyledTableCell align="right">Muscle Group</StyledTableCell>
              <StyledTableCell align="right">Experience Level</StyledTableCell>
              <StyledTableCell align="right">Recommended Sets & Reps</StyledTableCell>
              <StyledTableCell align="right">Equipment Needed</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: { exerciseName: string; muscleGroup: string; experienceLevel: string; setsReps: string; equipmentNeeded: string; }) => (
              <StyledTableRow key={row.exerciseName}>
                <StyledTableCell component="th" scope="row">
                  {row.exerciseName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.muscleGroup}</StyledTableCell>
                <StyledTableCell align="right">{row.experienceLevel}</StyledTableCell>
                <StyledTableCell align="right">{row.setsReps}</StyledTableCell>
                <StyledTableCell align="right">{row.equipmentNeeded}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
    </div>
  );
}

export default Exercises;
