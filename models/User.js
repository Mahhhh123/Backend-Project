const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tel: { type: String, required: true }, //
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
// ... (ใส่ bcrypt และ jwt methods เหมือนเดิม)
module.exports = mongoose.model('User', UserSchema);