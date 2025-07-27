// src/pages/admin/Logs.jsx
import React from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import TopBar from '../../components/TopBar';
import './AdminStyles.css';

const Logs = () => {
  // Static dummy logs for now; replace with live API if needed
  const logs = [
    { event: 'Login Success', user: 'beniel', time: '10:00 AM' },
    { event: 'File Uploaded', user: 'esakiamal', time: '10:05 AM' },
    { event: 'Logout', user: 'beniel', time: '10:10 AM' },
  ];

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-main">
        <TopBar title="📜 Activity Logs" />
        <ul className="log-list">
          {logs.map((log, i) => (
            <li key={i}><b>{log.user}</b>: {log.event} at {log.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Logs;
