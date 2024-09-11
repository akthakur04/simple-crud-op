'use client';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    setLoading(false); // Stop loader

    if (data.success) {
      alert('Registered successfully');
      router.push('/login'); // Redirect to the login page
    } else {
      alert(data.error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
          {loading ? 'Registering...' : 'Register'} {/* Disable button and show text while loading */}
        </Button>
      </form>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress /> {/* Display the loader below the button */}
        </Box>
      )}
    </Container>
  );
}
