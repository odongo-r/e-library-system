/* frontend/src/components/BooksList.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import '../styles/BooksList.css';

function BooksList() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) {
      setError('Please enter a search term.');
      return;
    }

    try {
      const response = await axios.get(`/books?search=${search}`);
      if (response.data.length === 0) {
        setError('No books found with the searched details.');
      } else {
        setBooks(response.data);
        setError('');
      }
    } catch (error) {
      console.error('Error searching books', error);
      setError('Error occurred while searching for books.');
    }
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="books-list">
      {/* Menu Bar */}
      <div className="menu-bar">
        <h3>Search for Books</h3>
        <button className="dashboard-button" onClick={handleDashboardClick}>
          Dashboard
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {/* Error or Book List */}
      {error && <p className="error-message">{error}</p>}
      <ul className="book-items">
        {books.map((book) => (
          <li key={book._id} className="book-item">
            <div className="book-details">
              <h4>{book.title}</h4>
              <p>by {book.author}</p>
            </div>
            <button
              onClick={() => navigate(`/books/${book._id}`)}
              className="view-details-button"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;


