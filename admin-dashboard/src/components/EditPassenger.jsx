import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, MenuItem, Typography, FormControl, Select, InputLabel, FormControlLabel, RadioGroup, FormLabel, Radio } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import MapPicker from './MapPicker';
import SchoolAddressAutocomplete from './SchoolAddressAutocomplete';

const EditPassenger = () => {
  const { clientId, passengerId } = useParams();
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
    pickupAddressHuman: '',
    type: '',
    medicalAidType: 'State', // Ensure a default value is set
    provider: '',
    plan: '',
    policyNumber: '',
    mainMember: '',
    networkHospital: ''
  });
  const [mapCenter, setMapCenter] = useState({
    lat: -26.1305, // Default latitude
    lng: 27.9737,  // Default longitude
  });
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPassengerData = async () => {
      const clientRef = doc(db, 'accountHolders', clientId);
      const clientDoc = await getDoc(clientRef);
      if (clientDoc.exists()) {
        const passengerData = clientDoc.data().passengers.find(p => p.passengerID === passengerId);
        if (passengerData) {
          setFormData(passengerData);
          if (passengerData.pickupAddress) {
            setMapCenter(passengerData.pickupAddress);
          }
        }
      }
    };
    fetchPassengerData();
  }, [clientId, passengerId]);

  const handleSave = async () => {
    try {
      const clientRef = doc(db, 'accountHolders', clientId);
      const clientDoc = await getDoc(clientRef);
      if (clientDoc.exists()) {
        const clientData = clientDoc.data();
        const updatedPassengers = clientData.passengers.map(passenger =>
          passenger.passengerID === passengerId ? { ...formData, pickupAddressHuman: formData.pickupAddressHuman } : passenger
        );
        await updateDoc(clientRef, { passengers: updatedPassengers });
        alert("Passenger updated successfully!");
        navigate('/clients');
      } else {
        console.error("Client not found");
      }
    } catch (error) {
      console.error("Error updating passenger:", error);
      alert("Failed to update passenger. Please try again.");
    }
  };

  const handleAddressSelect = ({ lat, lng, address }) => {
    setMapCenter({ lat, lng }); // Update map center
    setFormData((prevFormData) => ({
      ...prevFormData,
      pickupAddress: { lat, lng },
      pickupAddressHuman: address,
    }));
  };

  const handleSchoolAddressChange = (address) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      schoolAddress: address,
    }));
  };

  const handleSchoolNameChange = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      schoolName: name,
    }));
  };

  return (
    <Box sx={{ padding: 3, maxHeight: '80vh', overflowY: 'auto' }} ref={formRef}>
      <Typography variant="h6" gutterBottom style={{ color: 'black', fontWeight: 'bold' }}>Passenger Details</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="passenger-type-label">Passenger Type</InputLabel>
        <Select
          labelId="passenger-type-label"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <MenuItem value="Adult">Adult</MenuItem>
          <MenuItem value="Child">Child</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="First Name(s)"
        name="firstName"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name/Surname"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Preferred Name"
        name="preferredName"
        value={formData.preferredName}
        onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Number"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
        fullWidth
        margin="normal"
      />
      {formData.type === 'Adult' && (
        <>
          <TextField
            label="Relation to Account Holder"
            name="relation"
            value={formData.relation}
            onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
        </>
      )}
      {formData.type === 'Child' && (
        <>
          <TextField
            label="Relation to Account Holder"
            name="relation"
            value={formData.relation}
            onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
          <SchoolAddressAutocomplete 
            address={formData.schoolAddress} 
            onAddressChange={handleSchoolAddressChange} 
            onNameChange={handleSchoolNameChange} 
          />
          <TextField
            label="School Name"
            name="schoolName"
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            fullWidth
            margin="normal"
          />
        </>
      )}
      <Typography variant="h6" gutterBottom style={{ color: 'black', fontWeight: 'bold' }}>Default Pick-Up Location</Typography>
      <TextField
        label="Default Pick-Up Location"
        name="pickupAddressHuman"
        value={formData.pickupAddressHuman}
        onChange={(e) => setFormData({ ...formData, pickupAddressHuman: e.target.value })}
        fullWidth
        margin="normal"
        disabled // Make the field uneditable
      />
      <Typography variant="body2" gutterBottom style={{ color: 'black' }}>
        If this address is incorrect or you wish to change the default pick-up location, please search for the new address below.
      </Typography>
      <MapPicker center={mapCenter} onSelect={handleAddressSelect} zoom={17} /> {/* Adjust zoom level as needed */}
      <Typography variant="body2" gutterBottom style={{ color: 'black' }}>&nbsp;</Typography>
      <Typography variant="h6" gutterBottom style={{ color: 'black', fontWeight: 'bold' }}>Medical &amp; Emergency Information</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Medical Aid</FormLabel>
        <RadioGroup
          aria-label="medicalAid"
          name="medicalAidType"
          value={formData.medicalAidType}
          onChange={(e) => setFormData({ ...formData, medicalAidType: e.target.value })} >
          <FormControlLabel value="State" control={<Radio />} label="State" style={{ color: 'black' }} />
          <FormControlLabel value="Private" control={<Radio />} label="Private" style={{ color: 'black' }} />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Provider"
        name="provider"
        value={formData.provider}
        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
        fullWidth
        margin="normal"
        disabled={formData.medicalAidType === 'State'}
      />
      <TextField
        label="Plan"
        name="plan"
        value={formData.plan}
        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
        fullWidth
        margin="normal"
        disabled={formData.medicalAidType === 'State'}
      />
      <TextField
        label="Policy Number"
        name="policyNumber"
        value={formData.policyNumber}
        onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
        fullWidth
        margin="normal"
        disabled={formData.medicalAidType === 'State'}
      />
      <TextField
        label="Main Member"
        name="mainMember"
        value={formData.mainMember}
        onChange={(e) => setFormData({ ...formData, mainMember: e.target.value })}
        fullWidth
        margin="normal"
        disabled={formData.medicalAidType === 'State'}
      />
      <TextField
        label="Network Hospital (Name)"
        name="networkHospital"
        value={formData.networkHospital}
        onChange={(e) => setFormData({ ...formData, networkHospital: e.target.value })}
        fullWidth
        margin="normal"
        disabled={formData.medicalAidType === 'State'}
      />
      <TextField
        label="Medical Conditions"
        name="medicalConditions"
        value={formData.medicalConditions}
        onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mobility Assistance Required"
        name="mobilityAssistance"
        value={formData.mobilityAssistance}
        onChange={(e) => setFormData({ ...formData, mobilityAssistance: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Allergies or Special Dietary Restrictions"
        name="dietaryRestrictions"
        value={formData.dietaryRestrictions}
        onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Notes"
        name="otherInfo"
        value={formData.otherInfo}
        onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
        fullWidth
        margin="normal"
        multiline
        rows={4} // Make it a textarea
      />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
    </Box>
  );
};

export default EditPassenger;
