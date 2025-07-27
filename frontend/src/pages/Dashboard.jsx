// src/pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import './../styles.css';

const Dashboard = ({ userName }) => {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <h1>Welcome back, {userName || 'User'} 👋</h1>
        <p>Your smart analytics hub is ready.</p>
        <div className="analysis-box">
          <h3>Start New Analysis</h3>
          <p>Upload Excel to generate charts & insights.</p>
          <button className="primary-btn" onClick={() => window.location.href = '/upload'}>
            Go to Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
