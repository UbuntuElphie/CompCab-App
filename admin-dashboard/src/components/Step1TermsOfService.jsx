import React, { useState } from 'react';
import { Button, Box, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import TermsOfServicePage from './TermsOfServicePage';

const Step1TermsOfService = ({ onNext, data }) => {
  const [termsAccepted, setTermsAccepted] = useState(data || false);

  const handleChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsAccepted) {
      onNext({ termsAccepted });
    } else {
      alert('You must accept the terms of service to proceed.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <TermsOfServicePage />
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="termsAccepted"
                checked={termsAccepted}
                onChange={handleChange}
              />
            }
            label="I have read and accept the terms of service"
            style={{ color: 'black' }}
          />
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          disabled={!termsAccepted}
        >
          Next
        </Button>
      </form>
    </Box>
  );
};

export default Step1TermsOfService;
