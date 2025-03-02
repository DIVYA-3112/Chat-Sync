import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      navigate('/login');
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center">Sign Up</Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSignup}
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
      <Button
        fullWidth
        variant="text"
        color="secondary"
        onClick={() => navigate('/login')}
        sx={{ mt: 2 }}
      >
        Already have an account? Login
      </Button>
    </Container>
  );
};

export default Signup;
