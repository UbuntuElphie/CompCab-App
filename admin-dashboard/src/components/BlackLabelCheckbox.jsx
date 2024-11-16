import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const BlackLabelCheckbox = ({ checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label="Same as Physical Address"
      sx={{ color: 'black' }}
    />
  );
};

export default BlackLabelCheckbox;
