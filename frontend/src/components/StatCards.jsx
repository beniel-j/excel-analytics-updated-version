// src/components/StatCards.jsx
import React from 'react';
import '../pages/admin/AdminStyles.css';

const StatCards = ({ stats }) => {
  return (
    <div className="stat-cards">
      <div className="stat-card">👥 Users <span>{stats.users}</span></div>
      <div className="stat-card">🛡️ Admins <span>{stats.admins}</span></div>
      <div className="stat-card">📁 Uploads <span>{stats.uploads}</span></div>
    </div>
  );
};

export default StatCards;
