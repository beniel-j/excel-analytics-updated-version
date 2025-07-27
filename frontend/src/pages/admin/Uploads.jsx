// src/pages/admin/Uploads.jsx
import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import TopBar from '../../components/TopBar';
import axios from 'axios';
import './AdminStyles.css';

const Uploads = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/file/uploads')
      .then(res => setUploads(res.data))
      .catch(err => console.error("❌ Failed to fetch uploads", err));
  }, []);

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-main">
        <TopBar title="📁 All Uploads" />
        <table className="admin-table">
          <thead>
            <tr><th>File Name</th><th>Uploaded By</th><th>Date</th></tr>
          </thead>
          <tbody>
            {uploads.map(upload => (
              <tr key={upload._id}>
                <td>{upload.fileName}</td>
                <td>{upload.userEmail}</td>
                <td>{new Date(upload.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Uploads;
