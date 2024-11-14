/* frontend/src/components/BorrowedBooks.js */
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import '../styles/BorrowedBooks.css';

function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/borrowed-books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div>
      <h2>Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book._id}>
            {book.title} - Due on {new Date(book.dueDate).toLocaleDateString()}
            <button>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowedBooks;

