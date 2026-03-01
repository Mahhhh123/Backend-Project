const Massage = require('../models/Massage');

// @desc    Get all shops
// @route   GET /api/v1/massages
exports.getMassages = async (req, res, next) => {
    try {
        const massages = await Massage.find();
        res.status(200).json({ success: true, count: massages.length, data: massages });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Get one shop
// @route   GET /api/v1/massages/:id
exports.getMassage = async (req, res, next) => {
    try {
        const massage = await Massage.findById(req.params.id);
        if (!massage) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: massage });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Create new shop
// @route   POST /api/v1/massages
exports.createMassage = async (req, res, next) => {
    try {
        const massage = await Massage.create(req.body);
        res.status(201).json({ success: true, data: massage });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update shop
// @route   PUT /api/v1/massages/:id
exports.updateMassage = async (req, res, next) => {
    try {
        const massage = await Massage.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!massage) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: massage });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Delete shop
// @route   DELETE /api/v1/massages/:id
exports.deleteMassage = async (req, res, next) => {
    try {
        const massage = await Massage.findByIdAndDelete(req.params.id);
        if (!massage) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};