const express = require('express');
const { getReservations, addReservation, updateReservation, deleteReservation } = require('../controllers/reservation');
const { protect, authorize } = require('../middleware/middleware');
const router = express.Router();

router.route('/')
    .get(protect, getReservations)
    .post(protect, authorize('user', 'admin'), addReservation);

router.route('/:id')
    .put(protect, authorize('user', 'admin'), updateReservation)
    .delete(protect, authorize('user', 'admin'), deleteReservation);

module.exports = router;