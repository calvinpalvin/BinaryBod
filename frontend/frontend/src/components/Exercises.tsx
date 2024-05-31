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
  exerciseNames: string,
  muscleGroup: string,
  experienceLevel: string,
  setsReps: string,
  equipmentNeeded: string,
) {
  return { workoutName: exerciseNames, muscleGroup, experienceLevel, duration: setsReps, equipmentNeeded };
}



const Exercises: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/exercise_info/10')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const rows = data.map((exercises: { Exercise_Name: string; Muscle_Group: string; Experience_Level: string; Recommended_Sets_Reps: string; Equipment_Needed: string; }) => 
    createData(exercises.Exercise_Name, exercises.Muscle_Group, exercises.Experience_Level, exercises.Recommended_Sets_Reps, exercises.Equipment_Needed)
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Exercise Name </StyledTableCell>
            <StyledTableCell align="right">Muscle Group</StyledTableCell>
            <StyledTableCell align="right">Experience Level</StyledTableCell>
            <StyledTableCell align="right">Recommended Sets & Reps</StyledTableCell>
            <StyledTableCell align="right">Equipment Needed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: { workoutName: string; muscleGroup: string; experienceLevel: string; duration: string | number; equipmentNeeded: string; }) => (
            <StyledTableRow key={row.workoutName}>
              <StyledTableCell component="th" scope="row">
                {row.workoutName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.muscleGroup}</StyledTableCell>
              <StyledTableCell align="right">{row.experienceLevel}</StyledTableCell>
              <StyledTableCell align="right">{row.duration}</StyledTableCell>
              <StyledTableCell align="right">{row.equipmentNeeded}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Exercises;