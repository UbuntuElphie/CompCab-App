const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const secretKey = 'your-secret-key'; // Replace with a strong secret key

// Mock users for testing
const users = [
    { id: 1, username: 'driver1', password: 'password1' },
    { id: 2, username: 'driver2', password: 'password2' }
];

// Driver Authentication Endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Mock trip data
let trips = [];

// Trip Management Endpoints
app.post('/api/trips/start', (req, res) => {
    const { token, tripDetails } = req.body;
    try {
        jwt.verify(token, secretKey);
        trips.push({ ...tripDetails, status: 'in-progress' });
        res.json({ message: 'Trip started successfully' });
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.post('/api/trips/end', (req, res) => {
    const { token, tripDetails } = req.body;
    try {
        jwt.verify(token, secretKey);
        const trip = trips.find(t => t.driverName === tripDetails.driverName && t.status === 'in-progress');
        if (trip) {
            trip.endTime = tripDetails.endTime;
            trip.finalMileage = tripDetails.finalMileage;
            trip.status = 'completed';
            res.json({ message: 'Trip ended successfully' });
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Add the new location endpoint here
app.post('/api/trips/location', (req, res) => {
    const { token, latitude, longitude } = req.body;
    try {
        jwt.verify(token, secretKey);
        // Update location logic (e.g., store location in trip data or log it)
        console.log('Location received:', { latitude, longitude });
        res.json({ message: 'Location updated successfully' });
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
