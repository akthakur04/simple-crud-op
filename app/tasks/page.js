'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, List, ListItem, Box } from '@mui/material';
import Link from 'next/link';

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch('/api/todos', {
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


  const handleDelete = async (id) => {
    const res = await fetch(`/api/tasks/delete/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      // Remove the deleted task from the local state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };

  console.log(tasks)
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      {tasks && tasks?.length === 0 ? (
        <Typography variant="body1">No tasks available.</Typography>
      ) : (
        <List>
          {tasks && tasks?.map((task) => (
            <ListItem key={task._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
              </Box>
              <Box>
                <Link href={`/tasks/update/${task._id}`}>
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Update
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
