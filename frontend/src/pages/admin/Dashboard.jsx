// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import TopBar from '../../components/TopBar';
import axios from 'axios';
import './AdminStyles.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    uploads: 0,
    recentUploads: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, adminsRes, uploadsRes, recentRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/stats/users', { headers }),
          axios.get('http://localhost:5000/api/admin/stats/admins', { headers }),
          axios.get('http://localhost:5000/api/admin/stats/uploads', { headers }),
          axios.get('http://localhost:5000/api/admin/stats/uploads/recent', { headers }),
        ]);

        setStats({
          users: usersRes.data.count,
          admins: adminsRes.data.count,
          uploads: uploadsRes.data.count,
          recentUploads: recentRes.data.uploads
        });
      } catch (err) {
        console.error("❌ Failed to fetch admin stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-main">
        <TopBar />
        <h2 className="dashboard-title">📊 Admin Dashboard</h2>

        <div className="cards">
          <div className="card">👥 Total Users: {stats.users}</div>
          <div className="card">🧑‍💼 Admins: {stats.admins}</div>
          <div className="card">📁 Uploads: {stats.uploads}</div>
        </div>

        <div className="recent-uploads">
          <h3>📄 Recent Uploads</h3>
          <ul>
            {stats.recentUploads.length === 0 ? (
              <li>No uploads found</li>
            ) : (
              stats.recentUploads.map((upload, index) => (
                <li key={index}>
                  <strong>{upload.fileName}</strong><br />
                  <small>{new Date(upload.createdAt).toLocaleString()}</small>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
