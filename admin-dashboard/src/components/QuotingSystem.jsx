import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const QuotingSystem = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Quoting System</Typography>
      <form>
        <TextField
          label="Quote Amount"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
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

export default QuotingSystem;
