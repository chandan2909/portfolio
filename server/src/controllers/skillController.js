import Skill from '../models/Skill.js';
import { mockSkills } from '../data/mockData.js';
import mongoose from 'mongoose';

export const getSkills = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, data: mockSkills });
        }
        const skills = await Skill.find({}).sort({ category: 1, proficiency: -1 });
        res.json({ success: true, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
