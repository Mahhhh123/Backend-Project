const express = require('express');
const {
    getMassages,
    getMassage,
    createMassage,
    updateMassage,
    deleteMassage
} = require('../controllers/massage');

const { protect, authorize } = require('../middleware/middleware');

const reservationRouter = require('./reservation');

const router = express.Router();


// เพื่อให้ Express รู้ว่าถ้ามีคำว่า /reservations ต่อท้าย ให้วิ่งไปที่ Reservation Router ทันที
router.use('/:massageShopId/reservations', reservationRouter);

router.route('/')
    .get(getMassages) 
    .post(protect, authorize('admin'), createMassage); 

router.route('/:id')
    .get(getMassage)
    .put(protect, authorize('admin'), updateMassage) 
    .delete(protect, authorize('admin'), deleteMassage); 

module.exports = router;