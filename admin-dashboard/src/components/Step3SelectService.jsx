import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Button, Box, Typography, FormGroup } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const Step3SelectService = ({ onNext, onPrev, data, recordId }) => {
  const [servicesData, setServicesData] = useState({
    companionCab: data.companionCab || false,
    cabJunior: data.cabJunior || false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setServicesData({ ...servicesData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recordId) {
      try {
        const docRef = doc(db, 'accountHolders', recordId);
        await updateDoc(docRef, { services: servicesData });
        console.log('Services Data Saved:', { services: servicesData });
        onNext({ services: servicesData });
      } catch (error) {
        console.error('Error saving services:', error);
      }
    } else {
      console.error('No record ID found');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Services</Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="companionCab"
                checked={servicesData.companionCab}
                onChange={handleChange}
              />
            }
            label="Companion Cab (for elderly and mobility-impaired rideshare services)"
            style={{ color: 'black' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="cabJunior"
                checked={servicesData.cabJunior}
                onChange={handleChange}
              />
            }
            label="Cab Junior (for child transport services)"
            style={{ color: 'black' }}
          />
        </FormGroup>
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mr: 2 }}>
          Next
        </Button>
        <Button variant="contained" color="secondary" onClick={onPrev} sx={{ mt: 2 }}>
          Back
        </Button>
      </form>
    </Box>
  );
};

export default Step3SelectService;
