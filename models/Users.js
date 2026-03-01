const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tel: { type: String, required: true }, //
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});




// 1. Method สำหรับสร้าง JWT Token (แก้ Error ที่คุณเจอ)
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// 2. Method สำหรับเช็ครหัสผ่านตอน Login (ต้องใช้ในขั้นตอนถัดไป)
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 3. Middleware สำหรับเข้ารหัส Password ก่อนบันทึก (Hashing)
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// ... (ใส่ bcrypt และ jwt methods เหมือนเดิม)
module.exports = mongoose.model('User', UserSchema);