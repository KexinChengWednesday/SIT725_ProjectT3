const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gopick';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.warn('MongoDB connection failed. Running in MOCK mode.');
    console.warn(err.message);
  }
};

module.exports = connectDB;
