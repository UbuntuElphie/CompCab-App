const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample trip data
const trips = [
    { id: 1, driverName: 'John Doe', passengerName: 'Jane Smith', latitude: 51.505, longitude: -0.09, startTime: '10:00 AM', endTime: '11:00 AM', status: 'Completed' },
    { id: 2, driverName: 'Alice Johnson', passengerName: 'Bob Brown', latitude: 51.515, longitude: -0.1, startTime: '11:30 AM', status: 'In Progress' },
  // Add more sample data as needed
];

app.get('/api/trips', (req, res) => {
  res.json(trips);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
