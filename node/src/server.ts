import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorMiddleware';
import userRoutes from './routes/userRoutes';
import rideGroupRoutes from './routes/rideGroupRoutes';
import bookingRoutes from './routes/bookingRoutes';
import { protect } from './middlewares/authMiddleware';
import 'express-async-errors';
import path from 'path';
import adminRouter from './routes/adminDashboardRoutes';
import { connectDB } from './config/db';
import { corsOptions } from './config/corsOptions';

// Create Express app
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/status', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/user', userRoutes);
app.use('/api/rideGroup', rideGroupRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/admin', adminRouter);

// Example protected health route
app.get('/api/health', protect, (_req, res) => res.json({ status: 'ok' }));

// Static uploads with custom content-type handling
app.use('/uploads', (req, res, next) => {
  const ext = path.extname(req.path);
  if (ext === '.png') {
    res.setHeader('Content-Type', 'image/png');
  } else if (ext === '.jpg' || ext === '.jpeg') {
    res.setHeader('Content-Type', 'image/jpeg');
  }
  next();
}, express.static(path.join(__dirname, '..', 'public', 'uploads')));

// Error handler middleware
app.use(errorHandler);

// Server startup
const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log('\u2705 Server running on port', PORT);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
