import React from 'react';
import { Box, Typography } from '@mui/material';

const TermsOfServicePage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom style={{ color: 'black' }}>Terms of Service</Typography>
      <Typography variant="subtitle1" gutterBottom style={{ color: 'black' }}>
        Effective Date: January 1, 2024
      </Typography>
      
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Overview</Typography>
      <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
        Here you can provide a brief summary of the most important points of your Terms of Service...
      </Typography>
      
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Future Changes</Typography>
      <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
        Here you can mention any upcoming changes to the Terms of Service and their effective dates...
      </Typography>
      
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Full Terms of Service</Typography>
      <Box sx={{ maxHeight: '400px', overflowY: 'scroll', padding: 2, border: '1px solid #ccc' }}>
        <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
          Here you can insert the full text of your Terms of Service...
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsOfServicePage;
