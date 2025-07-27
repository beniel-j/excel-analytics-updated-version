// src/components/UploadTrendChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const UploadTrendChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/charts/uploads-per-day', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          const labels = data.map((entry) => entry.date);
          const counts = data.map((entry) => entry.count);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Uploads',
                data: counts,
                borderColor: '#3F72AF',
                backgroundColor: 'rgba(63, 114, 175, 0.3)',
                fill: true,
                tension: 0.4,
              },
            ],
          });
        } else {
          setChartData(null);
          setError("No chart data available.");
        }
      } catch (err) {
        console.error("❌ Error loading chart data", err);
        setError("Failed to fetch chart data. " + (err?.response?.data?.msg || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px #ccc' }}>
      <h4 style={{ marginBottom: '10px' }}>📈 Upload Trend</h4>

      {loading && <p>Loading chart...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && chartData && (
        <Line data={chartData} />
      )}

      {!loading && !error && !chartData && (
        <p style={{ color: 'gray' }}>No data to display.</p>
      )}
    </div>
  );
};

export default UploadTrendChart;
