import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';


const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/user_info/10')
      .then(response => {
        setData(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

//   return (
    // <div>
    //   <h1>Home Page</h1>
    //   {/* {JSON.stringify(data)} */}
    //   {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    // </div>

    return (
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
              Birthday: {new Date(data.DOB).toLocaleDateString()}
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
      );
    };

export default Home;