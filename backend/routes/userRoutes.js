const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// Update shipping information
router.post('/updateAddress', authMiddleware, async (req, res) => {
  const userId  = req.user.userId;
  const userInformation = req.body.shippingDetails // expect shipping info in the body

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { userInformation },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User information updated successfully', user });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ message: 'Error updating user information' });
  }
});

// Route to get user data (excluding password and id)
router.get('/getUserData', authMiddleware, async (req, res) => {

  const userId = req.user.userId; // Assuming user authentication middleware
  console.log("userId", userId);
  try {
    const user = await User.findById(userId);
    console.log("user", user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.userInformation);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
});

router.get('/', isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'name email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});
module.exports = router;