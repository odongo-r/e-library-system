/* backend/routes/books.js */
const express = require('express');
const multer = require('multer');
const { Book } = require('../models/Book');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Endpoint to upload a book
router.post('/upload', upload.single('bookFile'), async (req, res) => {
  const { title, author, description } = req.body;
  const filePath = req.file?.path; // Ensure filePath is only set if req.file exists

  if (!filePath) {
    console.error('File upload failed');
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const newBook = new Book({ title, author, description, filePath });
    await newBook.save();
    res.status(201).json({ message: 'Book uploaded successfully', book: newBook });
  } catch (error) {
    console.error('Error saving book to the database:', error);
    res.status(500).json({ message: 'Error uploading book', error: error.message });
  }
});

// Endpoint to search for books
router.get('/', async (req, res) => {
  const { search } = req.query;

  // If no search term is provided, return an error
  if (!search || search.trim() === '') {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    // Build query for search (case-insensitive)
    const query = { $or: [] };

    // Push conditions for title and author
    query.$or.push(
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    );

    // Optionally, search by genre if it's part of the model
    // This assumes you have a genre field in your book model.
    if (req.query.genre && req.query.genre.trim() !== '') {
      query.$or.push({ genre: { $regex: req.query.genre, $options: 'i' } });
    }

    // Find the books based on the query
    const books = await Book.find(query);

    // Send the found books or a message if no books found
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with the searched details.' });
    }

    res.json(books);
  } catch (error) {
    console.error('Error searching for books:', error);
    res.status(500).json({ message: 'Error searching for books', error: error.message });
  }
});

module.exports = router;


