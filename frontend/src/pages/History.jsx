// src/pages/History.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './../styles.css';

const History = () => {
  const [recentUploaded, setRecentUploaded] = useState([]);
  const [recentSaved, setRecentSaved] = useState([]);
  const [fullHistory, setFullHistory] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [uploadedRes, savedRes, historyRes] = await Promise.all([
        axios.get('http://localhost:5000/api/charts/recent-uploaded', { headers }),
        axios.get('http://localhost:5000/api/charts/recent-saved', { headers }),
        axios.get('http://localhost:5000/api/charts/history', { headers })
        ]);

        setRecentUploaded(uploadedRes.data);
        setRecentSaved(savedRes.data);
        setFullHistory(historyRes.data);
    };

    fetchData();
    }, []);


  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <h2>📊 Your Chart History</h2>

        <section>
          <h3>🕓 Recent Uploads (Latest 3)</h3>
          {recentUploaded.length === 0 ? (
            <p>No recent uploads.</p>
          ) : (
            <ul className="history-list">
              {recentUploaded.map((item, i) => (
                <li key={i}>
                  <strong>{item.title || `Uploaded Chart #${i + 1}`}</strong><br />
                  {new Date(item.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3>💾 Recent Saved Charts (Latest 3)</h3>
          {recentSaved.length === 0 ? (
            <p>No saved charts.</p>
          ) : (
            <ul className="history-list">
              {recentSaved.map((item, i) => (
                <li key={i}>
                  <strong>{item.title || `Saved Chart #${i + 1}`}</strong><br />
                  {new Date(item.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3>📚 Full History (Last 15)</h3>
          {fullHistory.length === 0 ? (
            <p>No history entries yet.</p>
          ) : (
            <ul className="history-list">
              {fullHistory.map((item, i) => (
                <li key={i}>
                  <strong>{item.title || `Chart #${i + 1}`}</strong><br />
                  {new Date(item.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default History;
