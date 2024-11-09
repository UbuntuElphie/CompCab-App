import React from 'react';
import UserManagement from './UserManagement';
import TripMap from './TripMap';
import Reports from './Reports';
import './Dashboard.css';

const Dashboard = () => {
    const activeUsers = 120; // Sample data for active users
    const ongoingTrips = 45; // Sample data for ongoing trips
    const totalEarnings = 7800; // Sample data for total earnings
    const totalTrips = 300; // Sample data for total trips

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="metrics">
                <div className="metric">
                    <h2>Active Users</h2>
                    <p>{activeUsers}</p>
                </div>
                <div className="metric">
                    <h2>Ongoing Trips</h2>
                    <p>{ongoingTrips}</p>
                </div>
                <div className="metric">
                    <h2>Total Earnings</h2>
                    <p>${totalEarnings}</p>
                </div>
                <div className="metric">
                    <h2>Total Trips</h2>
                    <p>{totalTrips}</p>
                </div>
            </div>
            <UserManagement />
            <h2>Real-time Trip Monitoring</h2>
            <TripMap />
            <Reports /> {/* Add the Reports component here */}
        </div>
    );
};

export default Dashboard;
