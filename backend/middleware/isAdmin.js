//isAmin middleware to check if user is admin or not

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const isAdmin = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: 'Token not found, please authenticate.' });
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');    
    // Check if user is admin in the database
    const user = await User.findById(decoded.userId);


    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }

    req.user = user;
 
    next();
  } catch (err) {
    console.error('Error in isAdmin middleware:', err);
    res.status(401).json({ message: 'Unauthorized lol' });
  }
};

module.exports = isAdmin;
