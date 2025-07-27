import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios'; // ✅ ADDED
import './../styles.css';

import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  PolarArea,
  Scatter,
  Bubble
} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const Upload = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [chartType, setChartType] = useState('');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [chartReady, setChartReady] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const chartRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);
      setChartReady(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    }
  });

  const chartData = {
    labels: excelData.map(row => row[xColumn]),
    datasets: [
      {
        label: `${yColumn} vs ${xColumn}`,
        data: excelData.map(row => row[yColumn]),
        backgroundColor: '#3282B8',
        borderColor: '#BBE1FA',
        borderWidth: 1,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#BBE1FA'
        }
      },
      title: {
        display: true,
        text: 'Your Data Visualization',
        color: '#BBE1FA'
      }
    },
    scales: {
      x: {
        ticks: { color: '#BBE1FA' }
      },
      y: {
        ticks: { color: '#BBE1FA' }
      }
    }
  };

  // ✅ BACKEND SAVE FUNCTION
const handleSaveChart = async () => {
  const token = localStorage.getItem('token');

  const chartToSave = {
    title: customTitle || `${chartType} - ${xColumn} vs ${yColumn}`,
    chartType,
    xColumn,
    yColumn,
    data: excelData,
    isSaved: true // ✅ required to filter saved charts
  };

  try {
    await axios.post('http://localhost:5000/api/charts/save', chartToSave, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("✅ Chart saved successfully!");
  } catch (err) {
    alert("❌ Failed to save chart.");
    console.error(err);
  }
};


  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <h2>📁 Upload Excel File</h2>

        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag & Drop or Click to Upload (.xlsx or .xls)</p>
        </div>

        {fileName && (
          <>
            <p><strong>Uploaded:</strong> {fileName}</p>

            <div className="selectors">
              <label>Chart Type:</label>
              <select onChange={(e) => setChartType(e.target.value)} defaultValue="">
                <option value="" disabled>Select chart</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
                <option value="doughnut">Doughnut</option>
                <option value="radar">Radar</option>
                <option value="polar">Polar Area</option>
                <option value="scatter">Scatter</option>
                <option value="bubble">Bubble</option>
              </select>

              <label>X Axis:</label>
              <select onChange={(e) => setXColumn(e.target.value)} defaultValue="">
                <option value="" disabled>Select column</option>
                {Object.keys(excelData[0] || {}).map((col, i) => (
                  <option key={i} value={col}>{col}</option>
                ))}
              </select>

              <label>Y Axis:</label>
              <select onChange={(e) => setYColumn(e.target.value)} defaultValue="">
                <option value="" disabled>Select column</option>
                {Object.keys(excelData[0] || {}).map((col, i) => (
                  <option key={i} value={col}>{col}</option>
                ))}
              </select>

              <label>Title:</label>
              <input
                type="text"
                placeholder="Enter chart title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />

              <button
                className="generate-btn"
                onClick={() => {
                  setChartReady(true);
                  setTimeout(() => {
                    chartRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Generate Chart
              </button>
            </div>
          </>
        )}

        {excelData.length > 0 && (
          <div className="preview-box">
            <h4>📄 Preview (first 5 rows):</h4>
            <pre>{JSON.stringify(excelData.slice(0, 5), null, 2)}</pre>
          </div>
        )}

        {chartReady && chartType && xColumn && yColumn && (
          <div className="chart-container" ref={chartRef}>
            <h3>📊 {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</h3>

            {chartType === 'bar' && <Bar data={chartData} options={chartOptions} />}
            {chartType === 'line' && <Line data={chartData} options={chartOptions} />}
            {chartType === 'pie' && <Pie data={chartData} options={chartOptions} />}
            {chartType === 'doughnut' && <Doughnut data={chartData} options={chartOptions} />}
            {chartType === 'radar' && <Radar data={chartData} options={chartOptions} />}
            {chartType === 'polar' && <PolarArea data={chartData} options={chartOptions} />}
            {chartType === 'scatter' && <Scatter data={chartData} options={chartOptions} />}
            {chartType === 'bubble' && <Bubble data={chartData} options={chartOptions} />}

            <button className="save-btn" onClick={handleSaveChart}>
              💾 Save this Chart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
