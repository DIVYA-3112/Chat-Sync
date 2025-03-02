import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logic for logging out
    console.log('Logged out');
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Welcome Home!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Home;
