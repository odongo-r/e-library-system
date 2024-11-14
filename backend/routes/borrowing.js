// backend/routes/borrowing.js
const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { borrowBook } = require('../controllers/bookController');
const { Borrowing } = require('../models/Borrowing');
const { Book } = require('../models/Book');
const router = express.Router();


router.post('/borrow', verifyToken, borrowBook); // Protect the route with verifyToken


// Borrow a book
router.post('/borrow', async (req, res) => {
  const { userId, bookId, borrowPeriodDays } = req.body;
  console.log(`Received borrow request - userId: ${userId}, bookId: ${bookId}, period: ${borrowPeriodDays}`);

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      console.warn('Book not found in borrowing route:', bookId);
      return res.status(404).json({ message: 'Book not found in library.' });
    }
    if (!book.available) {
      console.warn('Book is not available for borrowing:', bookId);
      return res.status(400).json({ message: 'Book is already borrowed by someone else.' });
    }

    book.available = false;
    book.borrower = userId;
    book.borrowedAt = new Date();
    book.borrowDuration = borrowPeriodDays;
    await book.save();
    console.log('Book marked as borrowed in database:', bookId);

    const newBorrowing = new Borrowing({ userId, bookId, dateBorrowed: new Date() });
    await newBorrowing.save();
    console.log('Borrowing record saved successfully:', newBorrowing._id);

    res.status(201).json({ message: 'Book borrowed successfully', borrowing: newBorrowing });
  } catch (error) {
    console.error('Unexpected error in /borrow route:', error);
    res.status(500).json({ message: 'Unexpected error while borrowing book.', error: error.message });
  }
});

// Return a book
router.post('/return/:bookId', async (req, res) => {
  const { bookId } = req.params;
  console.log(`Received return request for bookId: ${bookId}`);

  try {
    const borrowing = await Borrowing.findOneAndDelete({ bookId });
    if (!borrowing) {
      console.warn('No borrowing record found for return:', bookId);
      return res.status(404).json({ message: 'No borrowing record found for this book.' });
    }

    const book = await Book.findById(bookId);
    if (book) {
      book.available = true;
      book.borrower = null;
      book.borrowedAt = null;
      book.borrowDuration = null;
      await book.save();
      console.log('Book marked as returned in database:', bookId);
    }

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Unexpected error in /return route:', error);
    res.status(500).json({ message: 'Error returning book.', error: error.message });
  }
});

module.exports = router;


