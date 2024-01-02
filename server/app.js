const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./util/db');
const {verifyToken} = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes')
const secrete_key = process.env.JWT_SECRETE_KEY ;
const app = express();
app.use(cors({
  origin: 'https://online-classes-platform.netlify.app',
}));
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

connectToMongoDB();

app.get('/api/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the profile page!', user: req.user });
});

app.use('/api/user', userRoutes);
app.use('/api', userRoutes);

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({userId: existingUser._id},secrete_key, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  app.put('/api/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(userId);
      const updatedData = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      Object.assign(user, updatedData);
      await user.save();
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
        pincode: user.pincode,
        message: "user details are updated successfully!",
      });      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
