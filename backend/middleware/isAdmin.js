//isAmin middleware to check if user is admin or not

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
    ? req.headers.authorization.split(' ')[1] 
    : null;

  if (!token) {
    return res.status(401).json({ message: 'Token not found, please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin in the database
    const user = await User.findById(decoded.userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Error in isAdmin middleware:', err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = isAdmin;
