const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/booking.controller');

router.post('/', bookingCtrl.createBooking);
router.get('/', bookingCtrl.getBookings);
router.put('/:id', bookingCtrl.updateBooking);
router.delete('/:id', bookingCtrl.deleteBooking);

module.exports = router;
