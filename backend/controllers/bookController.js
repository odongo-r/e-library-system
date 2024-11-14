/* backend/controllers/bookController.js */
const Book = require('../models/Book');

// Add a new book, including a file
exports.addBook = async (req, res) => {
  const { title, author, genre, publicationDate, description, publishedYear } = req.body;
  const file = req.file; // Access the uploaded file from the request
  try {
    if (!file) {
      return res.status(400).json({ message: 'Book file is required' });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      description,
      publishedYear,
      file: file.buffer, // Store the file data as binary
      fileType: file.mimetype // Store the MIME type for the file
    });

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
    const books = await Book.find(filter).select('-file'); // Exclude file data for a lightweight response
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Borrow books
exports.borrowBook = async (req, res) => {
  const { bookId, borrowPeriodDays } = req.body;
  const userId = req.userId; // Provided by the middleware

  try {
    // Your borrowing logic here, using userId to track which user is borrowing the book
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing the book.' });
  }
};


