import React, { useState } from 'react';
import '../styles/BookForm.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to add a book
    console.log('Book added:', { title, author });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
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
      <button type="submit" className="form-button">Add Book</button>
    </form>
  );
}

export default BookForm;

