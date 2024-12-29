const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Update shipping information
router.post('/updateAddress', authMiddleware, async (req, res) => {
  const { userId } = req.body;
  const userInformation = req.body.shippingDetails // expect userId and shipping info in the body
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { userInformation },
      { new: true, runValidators: true }
    );
    console.log(user)
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
  
  try {
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.userInformation);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
});

module.exports = router;