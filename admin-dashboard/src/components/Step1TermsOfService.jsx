import React, { useState } from 'react';
import { Button, Box, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import TermsOfServicePage from './TermsOfServicePage';
import { useAdmin } from '../AdminContext'; // Ensure the path is correct

const Step1TermsOfService = ({ onNext, data }) => {
  const { isAdmin } = useAdmin();
  const [termsAccepted, setTermsAccepted] = useState(data || false);

  const handleChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsAccepted || isAdmin) {
      onNext({ termsAccepted });
    } else {
      alert('You must accept the terms of service to proceed.');
    }
  };

  const handleAdminSkip = () => {
    onNext({ termsAccepted: false }); // Set termsAccepted to false when skipped
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
          disabled={!termsAccepted && !isAdmin}
        >
          Next
        </Button>
        {isAdmin && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAdminSkip}
            sx={{ mt: 2, ml: 2 }}
          >
            Skip for Now
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Step1TermsOfService;
