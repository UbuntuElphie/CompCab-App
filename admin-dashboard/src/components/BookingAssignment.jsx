import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const BookingAssignment = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Booking Assignment</Typography>
      <form>
        <TextField
          label="Booking ID"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Driver ID"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Assign
        </Button>
      </form>
    </Box>
  );
};

export default BookingAssignment;
