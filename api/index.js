import app from '../server/src/app.js';
import connectDB from '../server/src/config/db.js';

// Initialize DB connection for the serverless function
connectDB();

export default app;
