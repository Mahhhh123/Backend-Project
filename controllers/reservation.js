const Reservation = require('../models/Reservation');
const Massage = require('../models/Massage');

// @desc    Get all reservations
// @route   GET /api/v1/reservations
exports.getReservations = async (req, res) => {
    try {
        let query;
        if (req.user.role !== 'admin') {
            query = Reservation.find({ user: req.user.id }).populate('Reservation');
        } else {
            query = Reservation.find().populate('Reservation user');
        }
        const reservations = await query;
        res.status(200).json({ success: true, count: reservations.length, data: reservations });
    } catch (err) {
        res.status(500).json({ success: false, message: "Cannot find Reservation" });
    }
};

// @desc    Add reservation
// @route   POST /api/v1/reservations
exports.addReservation = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const existedReservations = await Reservation.find({ user: req.user.id });
        
        // เงื่อนไขข้อ 3: จองได้ไม่เกิน 3 คิว
        if (existedReservations.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({ success: false, message: 'User has already made 3 reservations' });
        }

        const reservation = await Reservation.create(req.body);
        res.status(201).json({ success: true, data: reservation });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

// @desc    Update reservation
// @route   PUT /api/v1/reservations/:id
exports.updateReservation = async (req, res) => {
    try {
        let reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ success: false });

        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false });
        }

        reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: reservation });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

// @desc    Delete reservation
// @route   DELETE /api/v1/reservations/:id
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ success: false });

        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false });
        }

        await reservation.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};