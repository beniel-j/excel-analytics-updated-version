// src/components/admin/TopBar.jsx
import React from 'react';
import '../pages/admin/AdminStyles.css';

const TopBar = ({ adminName = "Admin" }) => {
  return (
    <div className="topbar">
      <h2>👋 Welcome, {adminName}</h2>
    </div>
  );
};

export default TopBar;
