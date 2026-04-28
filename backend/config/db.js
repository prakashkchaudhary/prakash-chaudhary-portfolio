import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
