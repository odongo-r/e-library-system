/* frontend/src/components/Analytics.js */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/Analytics.css'; // Import your CSS for styling

// Register necessary Chart.js components
Chart.register(...registerables);

function Analytics() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [borrowTrends, setBorrowTrends] = useState({
    labels: [],
    datasets: [
      {
        label: 'Borrowing Trends',
        data: [],
        backgroundColor: [], // Initialize an empty array for colors
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [chartKey, setChartKey] = useState(0); // Unique key for the Bar component

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Adjust the path based on your application's routing structure
  };

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await axios.get('/analytics/borrow-trends');
        const { labels, datasets } = response.data;

        // Generate an array of random colors for each bar
        const colors = datasets[0].data.map(() => 
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
        );

        setBorrowTrends({
          labels,
          datasets: [
            {
              label: 'Borrowing Trends',
              data: datasets[0].data, // Adjust based on your response structure
              backgroundColor: colors, // Set the generated colors
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });

        // Change chartKey to force re-render
        setChartKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error('Error fetching trends', error);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="analytics-container">
      <header className="management-header">
        <h2>Borrowing Trends</h2>
        <button className="logout-button" onClick={handleDashboardClick}>
          Dashboard
        </button>
      </header>
      <div className="chart-container"> {/* Added chart container */}
        {/* Use chartKey to force re-render */}
        <Bar key={chartKey} data={borrowTrends} options={{ responsive: true }} />
      </div>
    </div>
  );
}

export default Analytics;

