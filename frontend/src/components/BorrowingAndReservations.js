// frontend/src/components/BorrowingAndReservations.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Corrected import
import axios from '../utils/axiosInstance';
import '../styles/BorrowingAndReservations.css';

function BorrowingAndReservations() {
  const [bookName, setBookName] = useState('');
  const [borrowDuration, setBorrowDuration] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        console.log("Fetching borrowed books...");
        const response = await axios.get('/books/borrowed');
        console.log("Borrowed books fetched:", response.data);
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleBorrowBook = async () => {
  setError(''); // Clear previous errors

  // Input validation for book name and borrow duration
  if (!bookName.trim() || isNaN(borrowDuration) || borrowDuration <= 0) {
    setError('Please provide a valid book name and borrow duration.');
    return; // Exit the function if validation fails
  }

  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    setError('You must be logged in to borrow a book.');
    return;
  }

  try {
    // Decode the JWT token to get the user ID
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Assuming userId is part of the token

    // Search for the book by name
    console.log(`Searching for book: ${bookName}`);
    const searchResponse = await axios.get(`/books/search?query=${bookName}`);
    const book = searchResponse.data[0];

    if (!book) {
      setError('Book not found.');
      return;
    }

    if (!book.available) {
      setError('Book is currently borrowed by someone else.');
      return;
    }

    // Attempt to borrow the book using the retrieved book ID and borrow duration
    const borrowResponse = await axios.post(
      '/borrowing/borrow',
      {
        userId: userId,            // Use the decoded user ID
        bookId: book._id,          // Use the retrieved book ID
        borrowPeriodDays: parseInt(borrowDuration) // Convert borrow duration to an integer
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Borrow response:", borrowResponse.data);

    setBorrowedBooks([...borrowedBooks, { ...book, borrowDuration }]);
    setBookName('');
    setBorrowDuration('');
    setError('');
    alert(borrowResponse.data.message);
  } catch (error) {
    console.error('Error during borrowing:', error);
    const backendMessage = error.response?.data?.message || 'An error occurred while borrowing the book.';
    setError(backendMessage);
  }
};

  const handleReturnBook = async (bookId) => {
    try {
      console.log(`Returning book with ID: ${bookId}`);
      await axios.post(`/borrowing/return/${bookId}`);
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== bookId));
      alert('Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
      setError('An error occurred while returning the book.');
    }
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
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
        <div className="borrow-section">
          <h3>Borrow a Book</h3>
          <input
            type="text"
            placeholder="Enter book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="borrow-input"
          />
          <input
            type="number"
            placeholder="Enter borrow duration (days)"
            value={borrowDuration}
            onChange={(e) => setBorrowDuration(e.target.value)}
            className="borrow-duration-input"
          />
          <button onClick={handleBorrowBook} className="borrow-button">Borrow Book</button>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="borrowed-books-section">
          <h3>Your Borrowed Books</h3>
          <ul className="borrowed-books-list">
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <li key={index} className="borrowed-book-item">
                  <div className="book-details">
                    <h4>{book.title}</h4>
                    <p>by {book.author}</p>
                    <p>Borrowed for: {book.borrowDuration || 'N/A'} days</p>
                    <button
                      onClick={() => handleReturnBook(book._id)}
                      className="return-button"
                    >
                      Return Book
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No borrowed books.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BorrowingAndReservations;


