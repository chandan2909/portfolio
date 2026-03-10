import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        techStack: { type: [String], required: true },
        repoUrl: { type: String },
        liveUrl: { type: String },
        featured: { type: Boolean, default: false }
    },
    { timestamps: true }
);

projectSchema.index({ featured: 1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
