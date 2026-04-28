import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const IMAGE_URL = 'https://res.cloudinary.com/du6i7ocms/image/upload/v1777380730/ChatGPT_Image_Apr_28_2026_03_34_55_PM_ibfplx.jpg';

await mongoose.connect(process.env.MONGODB_URI);
console.log('MongoDB Connected...');

const result = await mongoose.connection.collection('projects').updateOne(
  { title: 'FoodBridge - Food Waste Management' },
  { $set: { imageUrl: IMAGE_URL } }
);

console.log('Updated:', result.modifiedCount, 'project(s)');
console.log('New image URL:', IMAGE_URL);
process.exit(0);
