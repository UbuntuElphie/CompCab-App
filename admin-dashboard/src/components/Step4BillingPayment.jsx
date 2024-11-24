import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import MapPicker from './MapPicker'; // Ensure the correct path for MapPicker
import BlackLabelCheckbox from './BlackLabelCheckbox'; // Ensure the correct path for BlackLabelCheckbox

const Step4BillingPayment = ({ onNext, onPrev, data, recordId }) => {
  const [billingData, setBillingData] = useState({
    billingAddress: data.billingAddress || '',
    preferredPaymentMethod: data.preferredPaymentMethod || ''
  });

  const [mapCenter, setMapCenter] = useState({ lat: -26.1305, lng: 27.9737 }); // Default map center
  const [mapZoom, setMapZoom] = useState(14); // Default zoom level
  const [sameAsPhysical, setSameAsPhysical] = useState(false);

  useEffect(() => {
    if (sameAsPhysical) {
      setBillingData((prevData) => ({
        ...prevData,
        billingAddress: data.address // Update billing address with physical address
      }));
    } else {
      setBillingData((prevData) => ({
        ...prevData,
        billingAddress: ''
      }));
    }
  }, [sameAsPhysical, data.address]);

  const handleCheckboxChange = (e) => {
    setSameAsPhysical(e.target.checked);
  };

  const handleAddressChange = ({ lat, lng, address }) => {
    setBillingData((prevData) => ({
      ...prevData,
      billingAddress: address
    }));
    setMapCenter({ lat, lng });
    setMapZoom(14);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!billingData.billingAddress) {
      alert('Billing Address is required.');
      return;
    }
    if (recordId) {
      try {
        const docRef = doc(db, 'accountHolders', recordId);
        await updateDoc(docRef, { billing: billingData });
        console.log('Billing Data Saved:', { billing: billingData });
        onNext({ billing: billingData });
      } catch (error) {
        console.error('Error saving billing information:', error);
      }
    } else {
      console.error('No record ID found');
    }
  };

  return (
    <Box sx={{ padding: 3, width: '100vw', maxWidth: '1200px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Billing and Payment Information</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '1200px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', boxSizing: 'border-box' }}>
          <FormControl sx={{ alignSelf: 'flex-end' }}>
            <BlackLabelCheckbox checked={sameAsPhysical} onChange={handleCheckboxChange} />
          </FormControl>
          <TextField
            label="Billing Address (if different from physical address)"
            name="billingAddress"
            variant="outlined"
            fullWidth
            margin="normal"
            value={billingData.billingAddress}
            onChange={handleChange}
            sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
            disabled // Making the Billing Address field uneditable
            required
          />
          {!sameAsPhysical && (
            <Box sx={{ width: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: '100%' }}>
                <MapPicker center={mapCenter} onSelect={handleAddressChange} zoom={mapZoom} />
              </Box>
            </Box>
          )}

          <Typography variant="h6" gutterBottom style={{ color: 'black', marginTop: '16px' }}>Preferred Payment Method</Typography>
          <RadioGroup name="preferredPaymentMethod" value={billingData.preferredPaymentMethod} onChange={handleChange}>
            <FormControlLabel value="creditCard" control={<Radio />} label="Credit/Debit Card" style={{ color: 'black' }} />
            <FormControlLabel value="bankTransfer" control={<Radio />} label="Bank Transfer/EFT" style={{ color: 'black' }} />
            <FormControlLabel value="cash" control={<Radio />} label="Cash" style={{ color: 'black' }} />
          </RadioGroup>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={onPrev}>
              Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Next
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Step4BillingPayment;
