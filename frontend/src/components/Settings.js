// frontend/src/components/Settings.js

import React, { useState } from 'react';
import axios from '../utils/axiosInstance';

function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Track errors separately

  const updateProfile = async () => {
    setError(''); // Clear previous errors
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await axios.put(
        '/user/profile',
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated successfully');
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Error updating profile');
    }
  };

  const changePassword = async () => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await axios.put(
        '/user/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Password changed successfully');
      console.log('Password change response:', response.data);
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.response?.data?.message || 'Error changing password');
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <input
          type="text"
          placeholder="New name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="New email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={updateProfile}>Update Profile</button>
      </div>
      <div>
        <input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={changePassword}>Change Password</button>
      </div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
    </div>
  );
}

export default Settings;


