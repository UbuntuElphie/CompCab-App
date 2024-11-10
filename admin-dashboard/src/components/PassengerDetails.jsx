import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const PassengerDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    pickupLocation: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.pickupLocation) {
      setError('All fields are required');
      return;
    }
    setError(null);
    // Here you can handle form submission (e.g., send data to a backend service)
    console.log('Form submitted:', formData);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Passenger Details</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Contact Information"
          name="contact"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.contact}
          onChange={handleChange}
        />
        <TextField
          label="Default Pickup Location"
          name="pickupLocation"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.pickupLocation}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default PassengerDetails;
