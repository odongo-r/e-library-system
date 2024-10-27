import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileSection.css';

function ProfileSection() {
  const navigate = useNavigate();

  return (
    <div className="profile-section" onClick={() => navigate('/profile')}>
      <img src="profile-icon.png" alt="Profile" className="profile-icon" />
      <span className="username">User Name</span>
    </div>
  );
}

export default ProfileSection;

