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
  date: string,
  calsEaten: number,
  goalCals: number,
  currWeight: number,
  goalWeight: number,
  waterDrank: number,
  goalWater: number,
) {
  return { date, calsEaten, goalCals, currWeight, goalWeight, waterDrank, goalWater };
}

const Nutrition: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/nutrition_info/${user.id}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);

  const rows = data.map((nutrition: { Date: string; Calories_Eaten: number; Calorie_Goal: number; Current_Weight: number; Goal_Weight: number; Water_Drank_oz: number; Goal_Water_Intake: number; }) => 
    createData(nutrition.Date, nutrition.Calories_Eaten, nutrition.Calorie_Goal, nutrition.Current_Weight, nutrition.Goal_Weight, nutrition.Water_Drank_oz, nutrition.Goal_Water_Intake)
  );

  if (!user) {
    return (
      <Typography variant="h6" align="center">
      Please <Link to="/"> sign in</Link> to view your nutrition data.
      </Typography>
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Calories Eaten</StyledTableCell>
              <StyledTableCell align="right">Calorie Goal</StyledTableCell>
              <StyledTableCell align="right">Current Weight</StyledTableCell>
              <StyledTableCell align="right">Goal Weight</StyledTableCell>
              <StyledTableCell align="right">Water Drank (oz)</StyledTableCell>
              <StyledTableCell align="right">Goal Water Intake (oz)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>  
            {rows.map((row: { date: string; calsEaten: number; goalCals: number; currWeight: number; goalWeight: number; waterDrank: number; goalWater: number; }) => (
              <StyledTableRow key={row.date}>
                <StyledTableCell component="th" scope="row">
                  {new Date(row.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calsEaten}</StyledTableCell>
                <StyledTableCell align="right">{row.goalCals}</StyledTableCell>
                <StyledTableCell align="right">{row.currWeight}</StyledTableCell>
                <StyledTableCell align="right">{row.goalWeight}</StyledTableCell>
                <StyledTableCell align="right">{row.waterDrank}</StyledTableCell>
                <StyledTableCell align="right">{row.goalWater}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" component={Link} to="/nutrition/add">
        Add Nutrition Info
      </Button>
    </div>
  );
}

export default Nutrition;
