const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  gender: String,
  age: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
});

// userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;