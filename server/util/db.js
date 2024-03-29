const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://swapnilnichal10:${process.env.DB_PASSWORD}@cluster0.3panst6.mongodb.net/FitEarn?retryWrites=true&w=majority`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToMongoDB;