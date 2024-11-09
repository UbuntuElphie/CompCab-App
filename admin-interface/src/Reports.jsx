import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Reports.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Trips',
                data: [65, 59, 80, 81, 56, 85, 70, 60, 90, 95, 100, 110],
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
            {
                label: 'Earnings',
                data: [28, 48, 40, 19, 86, 27, 35, 45, 55, 60, 75, 80],
                backgroundColor: 'rgba(153,102,255,0.6)',
            }
        ]
    };

    return (
        <div>
            <h2>Reports and Analytics</h2>
            <Bar data={data} />
        </div>
    );
};

export default Reports;
