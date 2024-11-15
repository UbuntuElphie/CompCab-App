import React, { useState, useRef } from 'react';
import { Box, Button, TextField, MenuItem, Typography, FormControl, Select, InputLabel, FormControlLabel, RadioGroup, FormLabel, Radio } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, getDocs, collection, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import MapPicker from './MapPicker';
import SchoolAddressAutocomplete from './SchoolAddressAutocomplete';

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
    pickupAddressHuman: '',
    medicalAidType: '', // Add this field
    provider: '', // Add this field
    plan: '', // Add this field
    policyNumber: '', // Add this field
    mainMember: '', // Add this field
    networkHospital: '' // Add this field
  });
  const [mapCenter, setMapCenter] = useState({
    lat: -26.1305, // Default latitude
    lng: 27.9737,  // Default longitude
  });
  const [isDPULDisabled, setIsDPULDisabled] = useState(true); // DPUL field disabled state
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
        passengers: arrayUnion({
          ...formData,
          type: passengerType,
          passengerID,
          dateOfBirth,
          pickupAddressHuman: formData.pickupAddressHuman,
        })
      });
      alert("Passenger added successfully!");
      // Reset form
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
        pickupAddressHuman: '',
        medicalAidType: '',
        provider: '',
        plan: '',
        policyNumber: '',
        mainMember: '',
        networkHospital: ''
      });
      setPassengerType('');
      setIsDPULDisabled(true); // Disable DPUL field
      formRef.current.focus(); // Set focus back to the top field
    } catch (error) {
      console.error("Error adding passenger:", error);
      alert("Failed to add passenger. Please try again.");
    }
  };

  const handleAddressSelect = ({ lat, lng, address }) => {
    setMapCenter({ lat, lng });
    setFormData((prevFormData) => ({
      ...prevFormData,
      pickupAddress: { lat, lng },
      pickupAddressHuman: address,
    }));
    setIsDPULDisabled(false);
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
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
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
            onChange={handleChange}
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
        disabled={isDPULDisabled} // Disable the field initially
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
          onChange={(e) => setFormData({ ...formData, medicalAidType: e.target.value })}
        >
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

export default AddPassenger;
