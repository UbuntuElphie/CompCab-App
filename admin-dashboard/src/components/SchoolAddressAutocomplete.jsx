import React, { useEffect, useRef, useState } from 'react';
import { TextField, Box } from '@mui/material';

const SchoolAddressAutocomplete = ({ address, onAddressChange, onNameChange }) => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  useEffect(() => {
    const handlePlaceChange = () => {
      const place = autocompleteRef.current.getPlace();
      console.log('Selected place:', place); // Log selected place for debugging

      if (place && place.place_id) {
        setSelectedPlaceId(place.place_id);
      } else {
        console.warn('No place selected or no place ID.');
      }
    };

    const initAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['establishment'],
          fields: ['place_id', 'name']
        });

        autocompleteRef.current.addListener('place_changed', handlePlaceChange);
      } else {
        console.error('Google Maps Places API not available');
      }
    };

    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (selectedPlaceId) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({ placeId: selectedPlaceId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
          console.log('Fetched place details:', place); // Log fetched place details for debugging
          onAddressChange(place.formatted_address);
          if (place.name) {
            onNameChange(place.name);
          } else {
            onNameChange('');
          }
        } else {
          console.warn('Failed to fetch place details or no geometry:', status);
        }
      });
    }
  }, [selectedPlaceId, onAddressChange, onNameChange]);

  return (
    <Box>
      <TextField
        inputRef={inputRef}
        label="School Address"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default SchoolAddressAutocomplete;
