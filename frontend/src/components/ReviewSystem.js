import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import '../styles/ReviewSystem.css';

function ReviewSystem() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Adjust the path based on your application's routing structure
  };

  return (
    <div className="review-system">
      <header className="management-header">
        <h2>Review and Rating System</h2>
        <button className="logout-button" onClick={handleDashboardClick}>
          Dashboard
        </button>
      </header>
      <ReviewForm />
      {/* Optionally, display existing reviews here */}
    </div>
  );
}

export default ReviewSystem;

