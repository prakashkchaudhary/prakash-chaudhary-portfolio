import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

// ✏️ CHANGE THESE TO YOUR NEW CREDENTIALS
const NEW_EMAIL = 'pprakash.k.chaudhary@gmail.com';
const NEW_PASSWORD = 'prakash@8848.np';

const changeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Delete existing admin
    await Admin.deleteMany({});
    console.log('Old admin deleted');

    // Create new admin
    const admin = await Admin.create({
      email: NEW_EMAIL,
      password: NEW_PASSWORD
    });

    console.log('✅ New admin created successfully!');
    console.log('Email:', NEW_EMAIL);
    console.log('Password:', NEW_PASSWORD);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

changeAdmin();
