import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import healthRoutes from './routes/healthRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);


// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
