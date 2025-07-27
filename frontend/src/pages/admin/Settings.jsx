// src/pages/admin/Settings.jsx
import React, { useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import TopBar from '../../components/TopBar';
import './AdminStyles.css';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Saved settings: Email=${email}, Theme=${theme}`);
  };

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-main">
        <TopBar title="⚙️ Admin Settings" />
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Email Notifications:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>Theme:
            <select value={theme} onChange={e => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <button type="submit">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
