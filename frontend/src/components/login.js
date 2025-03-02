import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      
      // Store the token in local storage or state
      localStorage.setItem('authToken', token);
      
      // Navigate to the home page
      navigate('/');
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center">Login</Typography>
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
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Button
        fullWidth
        variant="text"
        color="secondary"
        onClick={() => navigate('/signup')}
        sx={{ mt: 2 }}
      >
        Don’t have an account? Sign up
      </Button>
    </Container>
  );
};

export default Login;
