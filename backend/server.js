/* backend/server.js */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Ensure recursive creation if necessary
}

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const analyticsRoutes = require('./routes/analytics');
const borrowingRoutes = require('./routes/borrowing');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/borrowing', borrowingRoutes);

const PORT = process.env.PORT || 5000;

console.log('Starting the server...');
console.log(`PORT: ${PORT}`);
console.log(`MONGO_URI: ${process.env.MONGO_URI ? 'Exists' : 'Missing'}`);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });


