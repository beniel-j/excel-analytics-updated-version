// src/components/admin/FileTypeChart.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import '../pages/admin/AdminStyles.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FileTypeChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/stats/uploads') // Update if needed
      .then(res => {
        const uploads = res.data.uploads || [];

        const fileTypeCounts = uploads.reduce((acc, item) => {
          const ext = item.fileName.split('.').pop();
          acc[ext] = (acc[ext] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(fileTypeCounts),
          datasets: [
            {
              label: '# of Files',
              data: Object.values(fileTypeCounts),
              backgroundColor: ['#3F72AF', '#F9F7F7', '#112D4E', '#DBE2EF'],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(err => console.error('❌ Error fetching file stats', err));
  }, []);

  return (
    <div className="chart-section">
      <h3>📊 File Type Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default FileTypeChart;
