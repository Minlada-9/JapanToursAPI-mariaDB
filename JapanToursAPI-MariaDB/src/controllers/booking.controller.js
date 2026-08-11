const Booking = require('../models/booking.model');
const Tour = require('../models/tour.model');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { tour: tourId, qty, ...rest } = req.body;

    const tour = await Tour.findByPk(tourId);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });

    if (typeof qty === 'number' && tour.seats < qty) {
      return res.status(400).json({ error: 'Not enough seats' });
    }

    const booking = await Booking.create({ ...rest, qty, tourId: tour.id });

    if (typeof qty === 'number') {
      tour.seats = Math.max(0, tour.seats - qty);
      await tour.save();
    }

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bookings (พร้อมข้อมูลทัวร์ที่เชื่อมโยง เหมือน .populate('tour') ตอน MongoDB)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: Tour, as: 'tour' }],
      order: [['id', 'ASC']],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    await booking.update(req.body);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    await booking.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
