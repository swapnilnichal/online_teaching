const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        age: user.age,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/signup', async (req, res) => {
    try {
      const { username, email, password, phone, gender, age, address, city, state, pincode } = req.body;
      if (!username || !email || !password || !phone || !gender || !age || !address || !city || !state || !pincode) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone,
        gender,
        age,
        address,
        city,
        state,
        pincode
      });
      await newUser.save();
      res.status(201).json({ message: 'User signed up successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  module.exports = router;
