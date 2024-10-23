// frontend/src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book._id}>{book.title} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
