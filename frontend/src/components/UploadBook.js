/* frontend/src/components/UploadBook.js */
import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import '../styles/UploadBook.css';

function UploadBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('bookFile', file);

    try {
      await axios.post('/books/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form after successful upload
      setTitle('');
      setAuthor('');
      setDescription('');
      setFile(null);
    } catch (error) {
      setError('Failed to upload book.');
      console.error('Upload error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-book-form">
      <h2>Upload a Book</h2>
      {error && <div className="error-message">{error}</div>}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="file" accept=".pdf,.epub" onChange={handleFileChange} required />
      <button type="submit">Upload Book</button>
    </form>
  );
}

export default UploadBook;
