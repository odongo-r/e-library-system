// controllers/bookController.js
const Book = require('../models/Book');

// Add a new book to the database
exports.addBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;
  try {
    const newBook = new Book({ title, author, genre, publicationDate });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
};

// Get books, optionally filtered by title
exports.getBooks = async (req, res) => {
  const { title } = req.query;
  const filter = title ? { title: new RegExp(title, 'i') } : {}; // Case-insensitive search
  try {
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};
