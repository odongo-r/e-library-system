// frontend/src/components/BookDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="book-details">
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Author: {book.author}</p>
            <p>Published: {book.publishedDate}</p>
        </div>
    );
};

export default BookDetails;

