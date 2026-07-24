const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  process.exit(1);
});

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config({ path: "./backend/.env" });

const emailService = require('./services/emailService');
emailService.verifyConnection();

// Connect to database
connectDB();

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'https://vitamend.vercel.app'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Global Rate Limiting (15 mins window, max 200 requests)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Payload limit
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/init', require('./routes/initRoutes'));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Vitamend API is running' });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5005;

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
