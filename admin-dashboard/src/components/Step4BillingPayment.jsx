import React, { useState } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const Step4BillingPayment = ({ onNext, onPrev, data, recordId }) => {
  const [billingData, setBillingData] = useState({
    billingAddress: data.billingAddress || '',
    preferredPaymentMethod: data.preferredPaymentMethod || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Billing and Payment Information</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Billing Address (if different from physical address)"
          name="billingAddress"
          variant="outlined"
          fullWidth
          margin="normal"
          value={billingData.billingAddress}
          onChange={handleChange}
          sx={{ '& .MuiInputLabel-root': { color: 'black' } }}
        />
        
        <Typography variant="h6" gutterBottom style={{ color: 'black', marginTop: '16px' }}>Preferred Payment Method</Typography>
        <RadioGroup name="preferredPaymentMethod" value={billingData.preferredPaymentMethod} onChange={handleChange}>
          <FormControlLabel value="creditCard" control={<Radio />} label="Credit/Debit Card" style={{ color: 'black' }} />
          <FormControlLabel value="bankTransfer" control={<Radio />} label="Bank Transfer/EFT" style={{ color: 'black' }} />
          <FormControlLabel value="cash" control={<Radio />} label="Cash" style={{ color: 'black' }} />
        </RadioGroup>
        
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

export default Step4BillingPayment;
