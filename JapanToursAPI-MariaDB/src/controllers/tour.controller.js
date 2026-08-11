const Tour = require('../models/tour.model');

// Create tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tours
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.findAll({ order: [['id', 'ASC']] });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tour by id (id คือเลข AUTO_INCREMENT ของ MariaDB โดยตรง เช่น 1, 2, 3)
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    await tour.update(req.body);
    res.json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    await tour.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
