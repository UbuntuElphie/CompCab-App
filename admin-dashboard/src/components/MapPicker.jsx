import React, { useEffect, useRef, useState } from 'react';
import { TextField, Box, CircularProgress } from '@mui/material';

const MapPicker = ({ onSelect }) => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      try {
        if (mapRef.current && !mapInstanceRef.current) { // Prevent multiple map instances
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: -26.1305, lng: 27.9737 }, // Default location: Cresta Shopping Centre
            zoom: 14,
            mapId: '961a989e9ee33e34' // Your actual Map ID
          });

          mapInstanceRef.current = map;

          const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
          const marker = new AdvancedMarkerElement({
            map: map,
            position: new window.google.maps.LatLng(-26.1305, 27.9737),
            draggable: true,
          });
          markerRef.current = marker;

          window.google.maps.event.addListener(marker, 'dragend', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            onSelect({ lat, lng });
          });

          window.google.maps.event.addListener(map, 'click', async (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            marker.position = new window.google.maps.LatLng(lat, lng);

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                autocompleteRef.current.value = address;
                onSelect({ lat, lng });
              } else {
                console.error('Geocoder failed due to: ' + status);
              }
            });
          });

          const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
            types: ['geocode'],
            fields: ['geometry', 'formatted_address']
          });

          console.log("Autocomplete initialized:", autocomplete);

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log("Place changed:", place);
            if (place.geometry) {
              const location = place.geometry.location;
              mapInstanceRef.current.setCenter(location);
              mapInstanceRef.current.setZoom(17); // Adjust zoom level for better street view
              marker.position = location; // Update marker position
              onSelect({ lat: location.lat(), lng: location.lng() });
              console.log("Place selected:", place);
            } else {
              console.log("No geometry found for place.");
            }
          });

          setMapLoaded(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        setLoading(false);
      }
    };

    const initAutocompleteService = () => {
      const service = new window.google.maps.places.AutocompleteService();
      console.log("Autocomplete service initialized:", service);

      const handleChange = () => {
        const input = autocompleteRef.current.value;
        console.log("Keystroke detected:", input);

        if (input.length > 0) {
          service.getPlacePredictions({ input }, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              console.log("Predictions:", predictions);
            } else {
              console.error("Error fetching predictions:", status);
            }
          });
        }
      };

      if (autocompleteRef.current) {
        autocompleteRef.current.addEventListener('input', handleChange);
        autocompleteRef.current.style.position = 'relative';
        autocompleteRef.current.style.zIndex = 2147483647; // Maximum z-index value
      }
    };

    if (window.google && window.google.maps && window.google.maps.places) {
      initMap();
      initAutocompleteService();
    } else {
      const existingScript = document.getElementById('googleMaps');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBb1svKojclkDN4T7qVIz8_VrD_CKv6Lyc&libraries=places&callback=initMap`;
        script.id = 'googleMaps';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          initMap();
          initAutocompleteService();
        };
        document.head.appendChild(script);
      } else {
        existingScript.onload = () => {
          initMap();
          initAutocompleteService();
        };
      }
    }

    window.initMap = initMap;
    window.initAutocompleteService = initAutocompleteService;
  }, [onSelect]);

  return (
    <Box>
      <TextField
        fullWidth
        label="Enter address"
        inputRef={autocompleteRef}
        margin="normal"
        variant="outlined"
        style={{ position: 'relative', zIndex: 2147483647 }}
      />
      {loading && <CircularProgress />}
      <Box ref={mapRef} style={{ height: '400px', width: '100%' }} />
      {!mapLoaded && <div>Loading map...</div>}
    </Box>
  );
};

export default MapPicker;
