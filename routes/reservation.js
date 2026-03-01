const express = require('express');
const { getReservations, addReservation, updateReservation, deleteReservation, getReservation } = require('../controllers/reservation');
const { protect, authorize } = require('../middleware/middleware');

// แก้ไขบรรทัดนี้: เพิ่ม { mergeParams: true }
const router = express.Router({ mergeParams: true }); 

router.route('/')
    .get(protect, getReservations)
    .post(protect, authorize('user', 'admin'), addReservation);

router.route('/:id')
    .get(protect, getReservation) 
    .put(protect, authorize('user', 'admin'), updateReservation)
    .delete(protect, authorize('user', 'admin'), deleteReservation);

module.exports = router;