const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  publishedYear: Number,
});

module.exports = mongoose.model('Book', bookSchema);
