import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TripMap = () => {
    const [trips, setTrips] = useState([]);
    const defaultPosition = [51.505, -0.09];

    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch('http://localhost:5000/api/trips');
            const data = await response.json();
            setTrips(data);
        };

        fetchTrips();
    }, []);

    return (
        <MapContainer center={defaultPosition} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {trips.map((trip, index) => (
                <Marker key={index} position={[trip.latitude, trip.longitude]}>
                    <Popup>
                        <strong>{trip.driverName}</strong> - {trip.passengerName}<br />
                        Start: {trip.startTime ? trip.startTime : 'N/A'} <br />
                        End: {trip.endTime ? trip.endTime : 'In Progress'}<br />
                        Status: {trip.status}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default TripMap;
