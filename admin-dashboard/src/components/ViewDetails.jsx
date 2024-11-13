import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ViewDetails = ({ details, onClose }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <IconButton edge="end" aria-label="close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Details</Typography>
      <Typography variant="body1" style={{ color: 'black' }}>
        <strong>Name:</strong> {details.firstName} {details.lastName}
      </Typography>
      <Typography variant="body1" style={{ color: 'black' }}>
        <strong>ID:</strong> {details.clientId || details.idNumber || 'N/A'}
      </Typography>
      <Typography variant="body1" style={{ color: 'black' }}>
        <strong>Email:</strong> {details.email || 'N/A'}
      </Typography>
      <Typography variant="body1" style={{ color: 'black' }}>
        <strong>Phone Number:</strong> {details.contactNumber || 'N/A'}
      </Typography>
      <Typography variant="body1" style={{ color: 'black' }}>
        <strong>Address:</strong> {details.address || 'N/A'}
      </Typography>
      {details.relation && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>Relation to Account Holder:</strong> {details.relation}
        </Typography>
      )}
      {details.dateOfBirth && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>Date of Birth:</strong> {details.dateOfBirth}
        </Typography>
      )}
      {details.schoolName && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>School Name:</strong> {details.schoolName}
        </Typography>
      )}
      {details.schoolAddress && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>School Address:</strong> {details.schoolAddress}
        </Typography>
      )}
      {details.comments && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>Additional Comments/Specific Requests:</strong> {details.comments}
        </Typography>
      )}
      {details.medicalConditions && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>Medical Conditions:</strong> {details.medicalConditions}
        </Typography>
      )}
      {details.mobilityAssistance && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>Mobility Assistance Required:</strong> {details.mobilityAssistance}
        </Typography>
      )}
      {details.dietaryRestrictions && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>Allergies or Special Dietary Restrictions:</strong> {details.dietaryRestrictions}
        </Typography>
      )}
      {details.otherInfo && (
        <Typography variant="body1" style={{ color: 'black' }}>
          <strong>Other Relevant Information:</strong> {details.otherInfo}
        </Typography>
      )}
    </Box>
  );
};

export default ViewDetails;
