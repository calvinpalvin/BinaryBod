import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';

const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/user_info/${user.id}`)
        .then(response => {
          setData(response.data[0]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <Typography variant="h6" align="center">
        Please <Link to="/"> sign in</Link> to view your user information.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {data ? (
            <>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                User Information
              </Typography>
              <Typography variant="h5" component="div">
                {data.Fname} {data.Lname}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {data.Username}
              </Typography>
              <Typography variant="body2">
                Email: {data.Email}
                <br />
                Age: {calculateAge(data.DOB)}
                <br />
                Weight: {data.Weight}
                <br />
                Gender: {data.Gender}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">
              Loading...
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
