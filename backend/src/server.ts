import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import searchRoutes from './routes/search';
import busesRoutes from './routes/buses';
import seatsRoutes from './routes/seats';
import bookingsRoutes from './routes/bookings';

dotenv.config();

if (!process.env.BOT_TOKEN) {
  console.warn('Warning: BOT_TOKEN not set. Telegram authentication will fail.');
}

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, { ip: req.ip });
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/search', searchRoutes);
app.use('/api/buses', busesRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/bookings', bookingsRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;

