// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (for local MongoDB)
const MONGO_URI = "mongodb://127.0.0.1:27017/e-library-system"; 

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the E-Library API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

