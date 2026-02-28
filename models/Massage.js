const mongoose = require('mongoose');

const MassageShopSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    tel: { type: String, required: true },
    openCloseTime: { type: String, required: true }
});

module.exports = mongoose.model('MassageShop', MassageShopSchema);