// src/pages/admin/Users.jsx
import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import TopBar from '../../components/TopBar';
import axios from 'axios';
import './AdminStyles.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error("❌ Failed to fetch users", err));
  }, []);

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-main">
        <TopBar title="👥 Users List" />
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
