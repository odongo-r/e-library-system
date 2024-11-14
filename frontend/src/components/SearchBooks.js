/* frontend/src/components/SearchBooks.js */
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import '../styles/SearchBooks.css';

function SearchBooks() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/books/search?query=${query}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="search-books">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="search-result">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>{book.description}</p>
              <a href={book.filePath} target="_blank" rel="noopener noreferrer">Read</a>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBooks;
