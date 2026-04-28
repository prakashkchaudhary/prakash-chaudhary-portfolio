import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    index: true // Add index for faster queries
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  techStack: [{
    type: String,
    required: true
  }],
  githubLink: {
    type: String,
    trim: true
  },
  liveLink: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['web', 'mobile', 'desktop', 'other'],
    index: true // Add index for category filtering
  }
}, {
  timestamps: true
});

// Add compound index for common queries
projectSchema.index({ category: 1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
