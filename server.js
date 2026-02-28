const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// เชื่อมต่อ Routes ให้ตรงกับชื่อไฟล์ในรูป
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/reservations', require('./routes/reservation'));

const PORT = process.env.PORT || 5003;
app.listen(PORT, console.log(`Server running on port ${PORT}`));