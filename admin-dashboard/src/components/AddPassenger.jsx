import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Typography, FormControl, Select, InputLabel } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MapPicker from './MapPicker'; // Import the MapPicker component

const AddPassenger = ({ clientId }) => {
  const [passengerType, setPassengerType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    preferredName: '',
    relation: '',
    idNumber: '',
    gender: '',
    contactNumber: '',
    comments: '',
    medicalConditions: '',
    mobilityAssistance: '',
    dietaryRestrictions: '',
    otherInfo: '',
    dateOfBirth: '',
    schoolName: '',
    schoolAddress: '',
    pickupAddress: null, // Add pickupAddress field
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const clientRef = doc(db, 'accountHolders', clientId);
      await updateDoc(clientRef, {
        passengers: arrayUnion({ ...formData, type: passengerType })
      });
      alert("Passenger added successfully!");
      navigate('/clients');
    } catch (error) {
      console.error("Error adding passenger:", error);
      alert("Failed to add passenger. Please try again.");
    }
  };

  const handleAddressSelect = (address) => {
    console.log("Address selected:", address); // Debug log
    setFormData((prevFormData) => ({
      ...prevFormData,
      pickupAddress: address,
    }));
  };

  return (
    <Box sx={{ padding: 3, maxHeight: '80vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>Add Passenger</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="passenger-type-label">Passenger Type</InputLabel>
        <Select
          labelId="passenger-type-label"
          value={passengerType}
          onChange={(e) => setPassengerType(e.target.value)}
        >
          <MenuItem value="Adult">Adult</MenuItem>
          <MenuItem value="Child">Child</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="First Name(s)"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name/Surname"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Preferred Name"
        name="preferredName"
        value={formData.preferredName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Number"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {passengerType === 'Adult' && (
        <>
          <TextField
            label="Relation to Account Holder"
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </>
      )}
      {passengerType === 'Child' && (
        <>
          <TextField
            label="Relation to Account Holder"
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="School Name"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="School Address"
            name="schoolAddress"
            value={formData.schoolAddress}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </>
      )}
      <Typography variant="h6" gutterBottom>Pick-up Address</Typography>
      <MapPicker onSelect={handleAddressSelect} /> {/* Include the MapPicker component */}
      <TextField
        label="Additional Comments/Specific Requests"
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Medical Conditions"
        name="medicalConditions"
        value={formData.medicalConditions}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mobility Assistance Required"
        name="mobilityAssistance"
        value={formData.mobilityAssistance}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Allergies or Special Dietary Restrictions"
        name="dietaryRestrictions"
        value={formData.dietaryRestrictions}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Other Relevant Information"
        name="otherInfo"
        value={formData.otherInfo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
    </Box>
  );
};

export default AddPassenger;
