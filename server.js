const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(helmet());
app.use(xss());
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
    message: 'Too many requests from this IP, please try again after 10 minutes'
});
app.use(limiter);
app.use(hpp());





const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Massage Shop Reservation API',
            version: '1.0.0',
            description: 'API for managing massage shop bookings',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5003}/api/v1`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/reservations', require('./routes/reservation'));
app.use('/api/v1/massageshops', require('./routes/massage'));


const PORT = process.env.PORT || 5003;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});