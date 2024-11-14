import React, { useState } from 'react';
import axios from '../utils/axiosInstance';  // Ensure this points to your configured Axios instance
import '../styles/BookForm.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);  // For book file upload

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('genre', genre);
    formData.append('publishedYear', publishedYear);
    formData.append('description', description);
    if (file) formData.append('bookFile', file);  // Add the file to form data if it exists

    try {
      const token = localStorage.getItem('token');  // Optional: Get token if authentication is required
      await axios.post('/books/upload', formData, {  // Make sure the correct endpoint is used
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Adjust if authorization is needed
        },
      });
      alert('Book added successfully!');
      // Clear form fields after successful submission
      setTitle('');
      setAuthor('');
      setIsbn('');
      setGenre('');
      setPublishedYear('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add the book. Please try again.');
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h3>Add a New Book</h3>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="form-input"
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        className="form-input"
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="form-input"
      />
      <input
        type="number"
        placeholder="Published Year"
        value={publishedYear}
        onChange={(e) => setPublishedYear(e.target.value)}
        className="form-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-input"
      />
      <button type="submit" className="form-button">Add Book</button>
    </form>
  );
}

export default BookForm;


