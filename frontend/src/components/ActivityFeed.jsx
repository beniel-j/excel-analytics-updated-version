// src/components/admin/ActivityFeed.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../pages/admin/AdminStyles.css';

const ActivityFeed = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/logs') // Ensure this route exists
      .then(res => setLogs(res.data.logs || []))
      .catch(err => console.error("❌ Error fetching logs", err));
  }, []);

  return (
    <div className="activity-feed">
      <h3>📝 Recent Activities</h3>
      <ul>
        {logs.length === 0 ? (
          <li>No activity found.</li>
        ) : (
          logs.map((log, i) => (
            <li key={i}>
              <strong>{log.action}</strong> — {log.user} @ {new Date(log.timestamp).toLocaleString()}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ActivityFeed;
