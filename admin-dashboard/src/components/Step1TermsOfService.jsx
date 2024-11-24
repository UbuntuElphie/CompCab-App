import React, { useState } from 'react';
import { Button, Box, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import TermsOfServicePage from './TermsOfServicePage';

const Step1TermsOfService = ({ onNext }) => {
  const [termsAccepted, setTermsAccepted] = useState(false); // Ensure initial state is false

  const handleChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ termsAccepted });
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
          disabled={!termsAccepted} // Ensure button is disabled based on checkbox state
        >
          Next
        </Button>
      </form>
    </Box>
  );
};

export default Step1TermsOfService;
