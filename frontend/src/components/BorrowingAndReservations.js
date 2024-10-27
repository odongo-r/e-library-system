import React from 'react';
import { useNavigate } from 'react-router-dom';
import BorrowedBooks from './BorrowedBooks';
import '../styles/BorrowingAndReservations.css';

function BorrowingAndReservations() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Adjust the path based on your application's routing structure
  };

  return (
    <div className="borrowing-reservations">
      <header className="management-header">
        <h2>Borrowing and Reservations</h2>
        <button className="logout-button" onClick={handleDashboardClick}>
          Dashboard
        </button>
      </header>
      <div className="management-content">
        <BorrowedBooks />
      </div>
    </div>
  );
}

export default BorrowingAndReservations;

