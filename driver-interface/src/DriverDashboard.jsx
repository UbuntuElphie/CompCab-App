import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DriverLogin from './DriverLogin';
import './DriverDashboard.css';

const DriverDashboard = () => {
    const [token, setToken] = useState(null);
    const [tripStatus, setTripStatus] = useState('idle');
    const [tripInfo, setTripInfo] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        if (tripStatus === 'in-progress') {
            const watchId = navigator.geolocation.watchPosition(
                position => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    updateLocation(position.coords.latitude, position.coords.longitude);
                },
                error => console.error('Error getting location:', error),
                { enableHighAccuracy: true }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
        }
    }, [tripStatus]);

    const updateLocation = async (latitude, longitude) => {
        try {
            await axios.post('http://localhost:5000/api/trips/location', { token, latitude, longitude });
            console.log('Location updated:', { latitude, longitude });
        } catch (error) {
            console.error('Failed to update location:', error.response ? error.response.data.message : error.message);
        }
    };

    const handleLogin = (token) => {
        setToken(token);
    };

    const startTrip = async () => {
        const tripDetails = {
            driverName: 'John Doe',
            passengerName: 'Jane Smith',
            startTime: new Date().toLocaleTimeString(),
            initialMileage: 0,
        };
        try {
            await axios.post('http://localhost:5000/api/trips/start', { token, tripDetails });
            setTripInfo(tripDetails);
            setTripStatus('in-progress');
            console.log('Trip started:', tripDetails);
        } catch (error) {
            console.error('Failed to start trip:', error.response ? error.response.data.message : error.message);
        }
    };

    const endTrip = async () => {
        if (tripInfo) {
            const updatedTripInfo = {
                ...tripInfo,
                endTime: new Date().toLocaleTimeString(),
                finalMileage: 0,
                status: 'completed',
            };
            try {
                await axios.post('http://localhost:5000/api/trips/end', { token, tripDetails: updatedTripInfo });
                setTripInfo(updatedTripInfo);
                setTripStatus('completed');
                console.log('Trip ended:', updatedTripInfo);
            } catch (error) {
                console.error('Failed to end trip:', error.response ? error.response.data.message : error.message);
            }
        }
    };

    if (!token) {
        return <DriverLogin onLogin={handleLogin} />;
    }

    return (
        <div className="driver-dashboard">
            <h1>Driver Dashboard</h1>
            <button onClick={startTrip} disabled={tripStatus === 'in-progress'}>
                Start Trip
            </button>
            <button onClick={endTrip} disabled={tripStatus !== 'in-progress'}>
                End Trip
            </button>
            {tripInfo && (
                <div className="trip-info">
                    <h2>Trip Information</h2>
                    <p>Driver: {tripInfo.driverName}</p>
                    <p>Passenger: {tripInfo.passengerName}</p>
                    <p>Start Time: {tripInfo.startTime}</p>
                    {tripInfo.endTime && <p>End Time: {tripInfo.endTime}</p>}
                    {tripInfo.status && <p>Status: {tripInfo.status}</p>}
                    {location.latitude && <p>Current Location: {location.latitude}, {location.longitude}</p>}
                </div>
            )}
        </div>
    );
};

export default DriverDashboard;
