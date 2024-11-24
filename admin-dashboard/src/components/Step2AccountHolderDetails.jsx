import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import MapPicker from './MapPicker'; // Ensure the correct path for MapPicker

const Step2AccountHolderDetails = ({ onNext, data, termsAccepted = false }) => {
  const [accountHolderData, setAccountHolderData] = useState({
    firstName: data.firstName || '',
    preferredName: data.preferredName || '', // Added Preferred Name field
    lastName: data.lastName || '',
    idNumber: data.idNumber || '',
    email: data.email || '',
    phoneNumber: data.phoneNumber || '',
    complexNameAndNumber: data.complexNameAndNumber || '',
    address: data.address || '',
    termsAccepted: termsAccepted, // Include termsAccepted in state
    mapCenter: { lat: -26.1305, lng: 27.9737 } // Default map center
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountHolderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = ({ lat, lng, address }) => {
    setAccountHolderData((prevData) => ({
      ...prevData,
      address,
      mapCenter: { lat, lng }
    }));
  };

  const generateClientId = async (lastName) => {
    const initial = lastName.substring(0, 3).toUpperCase();
    const clientsRef = collection(db, 'accountHolders');
    const q = query(clientsRef, where('lastName', '>=', initial), where('lastName', '<', initial + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.docs.length + 1;
    const clientId = `${initial}${String(count).padStart(3, '0')}`;
    return clientId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Account Holder Details:', accountHolderData);
    try {
      const clientId = await generateClientId(accountHolderData.lastName);
      const docRef = await addDoc(collection(db, 'accountHolders'), {
        ...accountHolderData,
        clientId,
        termsAccepted: accountHolderData.termsAccepted // Save termsAccepted status
      });
      console.log('Account Holder Details Saved:', { accountHolder: accountHolderData, recordId: docRef.id, clientId });
      onNext({ accountHolder: accountHolderData, recordId: docRef.id, clientId });
    } catch (error) {
      console.error('Error saving account holder details:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Account Holder Details</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name(s)"
          name="firstName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.firstName}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        <TextField
          label="Preferred Name"
          name="preferredName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.preferredName}
          onChange={handleChange}
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.lastName}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        <TextField
          label="ID Number"
          name="idNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.idNumber}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        <TextField
          label="Email Address"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.email}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.phoneNumber}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        <TextField
          label="Complex Name & Number"
          name="complexNameAndNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.complexNameAndNumber}
          onChange={handleChange}
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        <TextField
          label="Physical Address"
          name="address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={accountHolderData.address}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
          disabled
        />
        <MapPicker center={accountHolderData.mapCenter} onSelect={handleAddressChange} zoom={14} />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Next
        </Button>
      </form>
    </Box>
  );
};

export default Step2AccountHolderDetails;
