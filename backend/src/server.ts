import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

// Load environment variables FIRST before anything else
dotenv.config();

import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import swaggerSpec from './config/swagger';

// Connect to MongoDB
connectDB();

const app: Application = express();

// ─────────────────────────────────────────────────
// Global Middleware
// ─────────────────────────────────────────────────

// Enable CORS — allow requests from the React frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// ─── Swagger Docs ─────────────────────────────────
// ← ADD these two lines
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// ──────────────────────────────────────────────────

// ─────────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: { message: '✅ Server is running', timestamp: new Date().toISOString() },
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: { message: '🎬 Movie Watchlist API', docs: 'http://localhost:5000/api-docs' },
  });
});

// ─────────────────────────────────────────────────
// Error Handling Middleware (must be LAST)
// ─────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─────────────────────────────────────────────────
// Start the Server
// ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;