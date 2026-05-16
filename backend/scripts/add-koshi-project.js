import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log('MongoDB Connected...');

const newProject = {
  title: 'New Koshi A/C - Bus Booking System',
  description: 'A comprehensive bus ticket booking platform for New Koshi A/C Yatayat. Features include real-time seat selection, online payment integration, booking management, and route scheduling.',
  techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Vercel'],
  githubLink: 'https://github.com/prakashkchaudhary/new-koshi-a-c',
  liveLink: 'https://new-koshi-a-c-three.vercel.app/',
  imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop&q=80',
  category: 'web'
};

const result = await mongoose.connection.collection('projects').insertOne(newProject);
console.log('✅ New Koshi A/C project added successfully!');
console.log('Project ID:', result.insertedId);
process.exit(0);
