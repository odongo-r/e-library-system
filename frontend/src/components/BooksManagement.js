/* BooksManagement.js */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BooksList from './BooksList';
import BookForm from './BookForm';
import '../styles/BooksManagement.css';

function BooksManagement() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Adjust the path based on your application's routing structure
  };

  return (
    <div className="books-management">
      <header className="management-header">
        <h2>Books Management</h2>
        <button className="logout-button" onClick={handleDashboardClick}>
          Dashboard
        </button>
      </header>
      <div className="management-content">
        <BooksList />
        <BookForm />
      </div>
    </div>
  );
}

export default BooksManagement;

