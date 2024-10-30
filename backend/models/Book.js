// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  description: { type: String },
  publishedYear: { type: Number }
});

module.exports = mongoose.model('Book', bookSchema);
