import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const TripExecution = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Trip Execution</Typography>
      <form>
        <TextField
          label="Trip ID"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default TripExecution;
