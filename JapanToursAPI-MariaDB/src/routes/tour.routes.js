const express = require('express');
const router = express.Router();
const tourCtrl = require('../controllers/tour.controller');

router.post('/', tourCtrl.createTour);
router.get('/', tourCtrl.getTours);
router.get('/:id', tourCtrl.getTour);
router.put('/:id', tourCtrl.updateTour);
router.delete('/:id', tourCtrl.deleteTour);

module.exports = router;
