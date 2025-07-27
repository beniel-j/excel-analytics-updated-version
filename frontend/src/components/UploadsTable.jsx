// src/components/admin/UploadsTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../pages/admin/AdminStyles.css';

const UploadsTable = () => {
  const [uploads, setUploads] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/stats/uploads/recent')
      .then(res => setUploads(res.data.uploads || []))
      .catch(err => console.error('❌ Error fetching uploads', err));
  }, []);

  const filtered = uploads.filter(u => u.fileName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="uploads-table">
      <h3>📂 Recent Uploads</h3>
      <input
        type="text"
        placeholder="Search by file name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>User</th>
            <th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((upload, index) => (
            <tr key={index}>
              <td>{upload.fileName}</td>
              <td>{upload.user || 'Unknown'}</td>
              <td>{new Date(upload.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadsTable;
