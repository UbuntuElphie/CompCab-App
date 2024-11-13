import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Confirmation = ({ formData }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoToDashboard = () => {
    navigate('/clients'); // Navigate to the Clients page
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom style={{ color: 'black' }}>Onboarding Successful</Typography>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
        Your Client ID: {formData.clientId}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
        Thank you for onboarding. You can now start adding passengers to your account.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleGoToDashboard}>
        Go to Clients List
      </Button>
    </Box>
  );
};

export default Confirmation;
