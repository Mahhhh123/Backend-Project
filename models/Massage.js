const mongoose = require('mongoose');

const MassageShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number']
    },
    openTime: {
        type: String,
        required: [true, 'Please add opening time'], 
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please use HH:mm format']
    },
    closeTime: {
        type: String,
        required: [true, 'Please add closing time'], 
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please use HH:mm format']
    }
});

module.exports = mongoose.model('MassageShop', MassageShopSchema);