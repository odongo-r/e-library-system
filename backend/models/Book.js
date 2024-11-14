// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  filePath: { type: String, required: true }, // Path to the uploaded file
  available: { type: Boolean, default: true }, // Tracks if the book is available
  borrower: { type: String, default: null }, // Stores the borrower name or ID if borrowed
  borrowDuration: { type: Number, default: null }, // Duration in days for borrowing
  borrowedAt: { type: Date, default: null }, // Timestamp of when the book was borrowed
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };


