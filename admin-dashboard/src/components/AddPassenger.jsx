import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, MenuItem, Typography, FormControl, Select, InputLabel } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, getDocs, collection, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import MapPicker from './MapPicker';

const AddPassenger = ({ clientId }) => {
  const [passengerType, setPassengerType] = useState('');
  const formRef = useRef(null);
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
    pickupAddress: null,
  });
  const navigate = useNavigate();
  const generatePassengerID = async (lastName) => {
    const prefix = `P-${lastName.substring(0, 3).toUpperCase()}`;
    const passengersRef = collection(db, 'accountHolders');
    const q = query(passengersRef, where('lastName', '==', lastName));
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size + 1;
    return `${prefix}${String(count).padStart(3, '0')}`;
  };

  const extractDateOfBirth = (idNumber) => {
    const year = idNumber.substring(0, 2);
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);
    const currentYear = new Date().getFullYear().toString().substring(2, 4);
    const fullYear = parseInt(year, 10) > parseInt(currentYear, 10) ? `19${year}` : `20${year}`;
    return `${fullYear}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    try {
      const passengerID = await generatePassengerID(formData.lastName);
      const dateOfBirth = extractDateOfBirth(formData.idNumber);
      const clientRef = doc(db, 'accountHolders', clientId);
      await updateDoc(clientRef, {
        passengers: arrayUnion({ ...formData, type: passengerType, passengerID, dateOfBirth })
      });
      alert("Passenger added successfully!");
      setFormData({
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
        pickupAddress: null,
      });
      setPassengerType('');
      formRef.current.focus(); // Set focus back to the top field
    } catch (error) {
      console.error("Error adding passenger:", error);
      alert("Failed to add passenger. Please try again.");
    }
  };

  const handleAddressSelect = (address) => {
    console.log("Address selected:", address);
    setFormData((prevFormData) => ({
      ...prevFormData,
      pickupAddress: address,
    }));
  };
  return (
    <Box sx={{ padding: 3, maxHeight: '80vh', overflowY: 'auto' }} ref={formRef}>
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
      <MapPicker onSelect={handleAddressSelect} />
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
