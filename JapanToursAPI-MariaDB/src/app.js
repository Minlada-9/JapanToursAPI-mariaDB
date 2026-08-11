const path = require('path');
const express = require('express');
const cors = require('cors');
const tourRoutes = require('./routes/tour.routes');
const bookingRoutes = require('./routes/booking.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);

// health check (moved from '/' so the frontend page can be served at '/')
app.get('/health', (req, res) => res.send('Japan Tours API running'));

// serve the frontend (index.html, 1.jpg, 2.png, 3.jpg) at http://localhost:3000/
app.use(express.static(path.join(__dirname, '..', 'frontend')));

module.exports = app;
