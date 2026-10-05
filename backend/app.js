import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.set('trust proxy', 1);

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS: allow the deployed frontend to send credentials (cookies)
app.use(
  cors({
    origin: (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/+$/, ''),
    credentials: true,
  })
);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'LeadDesk Mini API is running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 + centralized error handling (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;
