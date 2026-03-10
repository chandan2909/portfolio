import ContactMessage from '../models/ContactMessage.js';
import mongoose from 'mongoose';

export const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
        }

        if (mongoose.connection.readyState !== 1) {
            // Mock mode
            console.log('Mock Contact Submission:', { name, email, message });
            return res.status(201).json({ success: true, data: { _id: Date.now().toString(), name, email, message, createdAt: new Date() } });
        }

        const contact = await ContactMessage.create({ name, email, message });
        res.status(201).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
