import React from 'react';
import { FaChartLine, FaUserShield, FaUsers, FaUpload, FaCog, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../pages/admin/AdminStyles.css';

const SidebarAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">Excel Analytics</h2>
      <ul>
        <li onClick={() => navigate('/admin/dashboard')}><FaChartLine /> Dashboard</li>
        <li onClick={() => navigate('/admin/users')}><FaUsers /> User Tracker</li>
        <li onClick={() => navigate('/admin/uploads')}><FaUpload /> Upload Monitor</li>
        <li onClick={() => navigate('/admin/roles')}><FaUserShield /> Role Access</li>
        <li onClick={() => navigate('/admin/logs')}><FaHistory /> System Logs</li>
        <li onClick={() => navigate('/admin/settings')}><FaCog /> Settings</li>
        <li onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
