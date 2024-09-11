'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';

export default function HomePage() {
  const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   // Fetch the user from localStorage
  //   const userData = localStorage.getItem('user');
  //   if (userData) {
  //     setUser(JSON.parse(userData));
  //   }
  // }, []);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetch('/api/todos/', {
      method: 'GET',
      headers:{
        "Cache-Control":"no-cache, no-store, must-revalidate",
        "Pragma":"no-cache",
        "Expires":"0"
      }
    })
      .then(res => res.json())  // Parse the response as JSON
      .then(data => {
        console.log('data after fetch', data);
        setTasks(data);  // Update the state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);  // Handle any errors
      });
  }, []);

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Next.js CRUD App
      </Typography>
      
    {tasks?.map(e=>(<>{e?.title}</>))}
      {user ? (
        <Box mt={3}>
          <Typography variant="h6" component="p">
            Welcome, {user.email}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ margin: '20px 0' }}
          >
            Logout
          </Button>
          <Box>
            <Link href="/tasks/create" passHref>
              <Button variant="contained" color="primary" fullWidth>
                Create a Task
              </Button>
            </Link>
            <Box mt={2}>
              <Link href="/tasks" passHref>
                <Button variant="outlined" color="primary" fullWidth>
                  View Tasks
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box mt={3}>
          <Typography variant="body1">
            You are not logged in. Please log in to access the app.
          </Typography>
          <Box mt={2}>
            <Link href="/login" passHref>
              <Button variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Link>
          </Box>
          <Box mt={2}>
            <Link href="/register" passHref>
              <Button variant="outlined" color="secondary" fullWidth>
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Container>
  );
}
