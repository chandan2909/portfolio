import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        proficiency: { type: Number, min: 1, max: 100 }
    },
    { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
