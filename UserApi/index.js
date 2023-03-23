const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/hotel_booking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define the schema for the booking document
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  rooms: [{
    type: String,
    price: Number,
    quantity: Number,
    total: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

// Create the Booking model using the booking schema
const Booking = mongoose.model('Booking', bookingSchema);

// Create an Express app
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Handle POST requests to the /api/bookings endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    // Create a new booking document from the request body
    const booking = new Booking(req.body);

    // Save the booking to the database
    await booking.save();

    // Send a success response with the saved booking document
    res.status(201).json(booking);
  } catch (error) {
    // Send an error response with the error message
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Start the server on port 3000
app.listen(3000, () => console.log('Server started on port 3000'));
