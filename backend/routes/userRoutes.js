const express = require('express');
const User = require('../models/User');
const UserInformation = require('../models/UserInformation');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Update shipping information
router.post('/updateAddress', authMiddleware, async (req, res) => {
  const { userId } = req.body;
  const shipping = req.body.shippingDetails // expect userId and shipping info in the body
  console.log("this is req.body at userroutes", req.body)
  try {
    const user = await User.findById(userId);
   console.log(" 1 FIRST user at user routes",user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // // Check if the user already has shipping information
    if (user.userInformation) {
      // If shipping information exists, update it
      user.userInformation = {
        fullName: shipping.fullName,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        postalCode: shipping.postalCode,
        country: shipping.country,
      };
      await user.save();
      res.status(200).json({ message: 'Your shipping information has been updated' });
    } else {
      // If shipping information does not exist, create it
      user.userInformation = {
        fullName: shipping.fullName,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        postalCode: shipping.postalCode,
        country: shipping.country,
      };
      await user.save();
      console.log("SECOND 2 user at user routes",user)

      res.status(201).json({ message: 'Your shipping information has been created' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating shipping information' });
  }
});

// Route to get user data (excluding password and id)
router.get('/getUserData', authMiddleware, async (req, res) => {

  const userId = req.user.userId; // Assuming user authentication middleware

  try {
    const userInformation = await UserInformation.findOne({ user: userId }).populate('user'); // Populate the user field
    if (!userInformation) {
      return res.status(404).json({ message: 'User information not found' });
    }
    res.json(userInformation); // Send the user data, including shipping information
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router;