import React, { useEffect, useRef, useState } from 'react';
import { TextField, Box, CircularProgress } from '@mui/material';

const MapPicker = ({ center = { lat: -26.1305, lng: 27.9737 }, onSelect, zoom = 14 }) => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const initMap = async () => {
      try {
        if (mapRef.current && !mapInstanceRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapId: '961a989e9ee33e34', // Your actual Map ID
          });

          mapInstanceRef.current = map;

          const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
          const marker = new AdvancedMarkerElement({
            map,
            position: new window.google.maps.LatLng(center.lat, center.lng),
            draggable: true,
          });
          markerRef.current = marker;

          const geocodeLatLng = (geocoder, lat, lng) => {
            return new Promise((resolve, reject) => {
              geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                  resolve(results[0].formatted_address);
                } else {
                  reject(status);
                }
              });
            });
          };

          const updateAddressField = async (lat, lng) => {
            const geocoder = new window.google.maps.Geocoder();
            try {
              const address = await geocodeLatLng(geocoder, lat, lng);
              if (autocompleteRef.current) {
                autocompleteRef.current.value = address;
              }
              onSelect({ lat, lng, address });
            } catch (error) {
              console.error('Geocode error:', error);
            }
          };

          marker.addListener('dragend', async (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            marker.position = new window.google.maps.LatLng(lat, lng);
            updateAddressField(lat, lng);
          });

          map.addListener('click', async (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            marker.position = new window.google.maps.LatLng(lat, lng);
            updateAddressField(lat, lng);
          });

          const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
            types: ['geocode'],
            fields: ['geometry', 'formatted_address'],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              const location = place.geometry.location;
              map.setCenter(location);
              map.setZoom(17); // Adjust zoom level for better street view
              marker.position = new window.google.maps.LatLng(location.lat(), location.lng()); // Update marker position
              if (autocompleteRef.current) {
                autocompleteRef.current.value = place.formatted_address;
              }
              onSelect({ lat: location.lat(), lng: location.lng(), address: place.formatted_address });
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

    if (window.google && window.google.maps && window.google.maps.places) {
      initMap();
    } else {
      const existingScript = document.getElementById('googleMaps');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
        script.id = 'googleMaps';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          initMap();
        };
        document.head.appendChild(script);
      } else {
        existingScript.onload = () => {
          initMap();
        };
      }
    }

    window.initMap = initMap;
  }, [onSelect, center, zoom]);

  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setCenter(center);
      if (markerRef.current) {
        markerRef.current.position = new window.google.maps.LatLng(center.lat, center.lng);
      }
    }
  }, [center]);

  return (
    <Box>
      <TextField
        fullWidth
        label="Enter Address"
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
