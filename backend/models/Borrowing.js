// backend/models/Borrowing.js
const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  dateBorrowed: { type: Date, default: Date.now },
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

module.exports = { Borrowing };


