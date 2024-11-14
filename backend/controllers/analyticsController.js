/* backend/controllers/analyticsController.js*/
const Book = require('../models/Book'); // Adjust this according to your book model

const getBorrowTrends = async (req, res) => {
  try {
    // Example aggregation pipeline to get borrowing trends
    const trends = await Book.aggregate([
      {
        $group: {
          _id: { $month: "$borrowedDate" }, // Adjust field name as per your schema
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Sort by month
      }
    ]);

    // Prepare the data for Chart.js
    const labels = trends.map(trend => {
      const date = new Date(0);
      date.setUTCMonth(trend._id - 1); // Months are 0 indexed
      return date.toLocaleString('default', { month: 'long' });
    });

    const data = trends.map(trend => trend.count);

    // Send formatted data
    res.json({
      labels,
      datasets: [{
        label: 'Borrowed Books',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBorrowTrends };

