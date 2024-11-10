import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const BillingReporting = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Billing and Reporting</Typography>
      <form>
        <TextField
          label="Invoice Number"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amount"
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
          Generate Report
        </Button>
      </form>
    </Box>
  );
};

export default BillingReporting;
