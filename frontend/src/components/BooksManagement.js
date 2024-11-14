/* frontend/src/components/BooksManagement.js */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from './BookForm';
import '../styles/BooksManagement.css';

function BooksManagement() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="books-management">
      <header className="management-header">
        <h2>Books Management</h2>
        <button className="dashboard-button" onClick={handleDashboardClick}>
          Dashboard
        </button>
      </header>
      <div className="form-section">
        <BookForm />
      </div>
    </div>
  );
}

export default BooksManagement;
