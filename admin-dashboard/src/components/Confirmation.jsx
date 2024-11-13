import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Confirmation = ({ formData }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom style={{ color: 'black' }}>Onboarding Successful</Typography>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
        Your Client ID: {formData.clientId}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
        Thank you for onboarding. You can now start adding passengers to your account.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default Confirmation;
