import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const TripDetails = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Trip Details</Typography>
      <form>
        <TextField
          label="Destination"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Departure Time"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default TripDetails;
