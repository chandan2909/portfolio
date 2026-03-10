import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.warn('WARN: MONGO_URI is not defined. Using mock data mode.');
            return false; // indicates no db connection
        }

        // In serverless environments, we don't want to reconnect if already connected
        if (mongoose.connection.readyState >= 1) {
            return true;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
