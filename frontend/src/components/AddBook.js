// frontend/src/components/AddBook.js
import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [coverImage, setCoverImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = { title, author, description, publishedYear, genre, coverImage };
        await axios.post('http://localhost:5000/api/books', newBook);
        // Reset form or show success message
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
            <input type="number" placeholder="Published Year" value={publishedYear} onChange={e => setPublishedYear(e.target.value)} required />
            <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
            <input type="text" placeholder="Cover Image URL" value={coverImage} onChange={e => setCoverImage(e.target.value)} />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
