const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Update shipping information
router.put('/updateAddress', async (req, res) => {
  const { userId, shipping } = req.body; // expect userId and shipping info in the body

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.shipping = shipping;
    await user.save();

    res.status(200).json({ message: 'Your shipping information has been updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating shipping information' });
  }
});

module.exports = router;