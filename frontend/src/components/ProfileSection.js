// frontend/src/components/Profile.js

import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.response?.data?.message || 'Error fetching profile');
      } finally {
        setLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>; 

  return profile ? (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Add any other profile fields as needed */}
    </div>
  ) : (
    <p>No profile data available.</p>
  );
}

export default Profile;


