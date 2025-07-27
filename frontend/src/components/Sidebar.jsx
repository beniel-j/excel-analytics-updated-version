// src/components/Sidebar.js
import React from 'react';
import {
  FaTachometerAlt, FaUpload, FaChartBar, FaUser,
  FaCog, FaInfoCircle, FaHistory, FaSignOutAlt
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import './../styles.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Excel Analytics</h2>
      <ul>
        <li><NavLink to="/dashboard"><FaTachometerAlt /> Dashboard</NavLink></li>
        <li><NavLink to="/upload"><FaUpload /> Upload</NavLink></li>
        <li><NavLink to="/saved"><FaChartBar /> Saved Analysis</NavLink></li>
        <li><NavLink to="/history"><FaHistory /> History</NavLink></li>
        <li><NavLink to="/profile"><FaUser /> Profile</NavLink></li>
        <li><NavLink to="/settings"><FaCog /> Settings</NavLink></li>
        <li><NavLink to="/about"><FaInfoCircle /> About</NavLink></li>
        <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
