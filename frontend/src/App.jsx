// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { jwtDecode } from 'jwt-decode';

// Pages
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminLogs from './pages/admin/Logs';
import AdminUploads from './pages/admin/Uploads';
import AdminSettings from './pages/admin/Settings';

// Private Route
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setRole(parsedUser.role || 'user');
        setUserName(parsedUser.name || '');
      } catch (err) {
        console.error('Invalid user data or token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const isLoggedIn = !!token;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect */}
        <Route
          path="/"
          element={
            isLoggedIn
              ? role === 'admin'
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        {/* User Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute token={token} role={role} allowedRole="user">
              {role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Dashboard userName={userName} />}
            </PrivateRoute>
          }
/>

        <Route path="/upload" element={<PrivateRoute token={token} role={role} allowedRole="user"><Upload /></PrivateRoute>} />
        <Route path="/saved" element={<PrivateRoute token={token} role={role} allowedRole="user"><Saved /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute token={token} role={role} allowedRole="user"><Profile /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute token={token} role={role} allowedRole="user"><Settings /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute token={token} role={role} allowedRole="user"><About /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute token={token} role={role} allowedRole="user"><History /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute token={token} role={role} allowedRole="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute token={token} role={role} allowedRole="admin"><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/logs" element={<PrivateRoute token={token} role={role} allowedRole="admin"><AdminLogs /></PrivateRoute>} />
        <Route path="/admin/uploads" element={<PrivateRoute token={token} role={role} allowedRole="admin"><AdminUploads /></PrivateRoute>} />
        <Route path="/admin/settings" element={<PrivateRoute token={token} role={role} allowedRole="admin"><AdminSettings /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
