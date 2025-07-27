// src/pages/admin/Feedbacks.jsx
import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import TopBar from '../../components/TopBar';
import './AdminStyles.css';
import axios from 'axios';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/feedbacks')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("❌ Failed to fetch feedbacks", err));
  }, []);

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-main">
        <TopBar title="💬 User Feedbacks" />
        <ul className="feedback-list">
          {feedbacks.map((fb, i) => (
            <li key={i}>
              <strong>{fb.user}</strong>: {fb.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feedbacks;
