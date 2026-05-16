import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log('MongoDB Connected...');

const result = await mongoose.connection.collection('projects').updateOne(
  { title: 'New Koshi A/C - Bus Booking System' },
  { $set: { imageUrl: 'https://res.cloudinary.com/dwzfe8stn/image/upload/c_fill,g_south,h_400,w_600/bus-exterior.jpg_eamh5i' } }
);

console.log('Updated:', result.modifiedCount, 'project(s)');
process.exit(0);
