import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import '../styles/BooksList.css';

function BooksList() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/books?search=${search}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books', error);
    }
  };

  return (
    <div className="books-list">
      <h3>Search for Books</h3>
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

