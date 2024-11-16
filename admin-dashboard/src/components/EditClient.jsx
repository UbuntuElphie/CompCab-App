import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const EditClient = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      const clientRef = doc(db, 'accountHolders', clientId);
      const clientDoc = await getDoc(clientRef);
      if (clientDoc.exists()) {
        const clientData = clientDoc.data();
        setClient(clientData);
        setFirstName(clientData.firstName || '');
        setLastName(clientData.lastName || '');
        setEmail(clientData.email || '');
        setPhoneNumber(clientData.phoneNumber || '');
        setAddress(clientData.address || '');
      }
    };

    fetchClient();
  }, [clientId]);

  const handleSave = async () => {
    try {
      console.log('handleSave called');
      const clientRef = doc(db, 'accountHolders', clientId);
      await updateDoc(clientRef, {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
      });
      console.log('Document updated');
      navigate('/clients'); // Navigate back to the client list
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  if (!client) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>Edit Client</Typography>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
    </Box>
  );
};

export default EditClient;
