import mongoose from 'mongoose';


const connectMongo = async () => {
  // Check if the mongoose connection is already established
  if (mongoose.connection.readyState !== 1) {
    console.log('Attempting to connect to MongoDB...');
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'myapp', // Explicitly specify the database name
      });
      console.log('MongoDB Reconnected to myapp');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  } else {
    console.log('MongoDB already connected');
  }
};

export default connectMongo;
