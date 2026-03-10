import Project from '../models/Project.js';
import { mockProjects } from '../data/mockData.js';
import mongoose from 'mongoose';

export const getProjects = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, data: mockProjects });
        }
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
