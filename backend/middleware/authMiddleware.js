// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    // Decode the token using your JWT secret
    const decoded = jwt.verify(token, jwtSecret); // Make sure to replace 'your_jwt_secret' with your actual secret
   
    // Attach the entire decoded payload (including userId) to req.user
    req.user = decoded; // You can store the entire decoded payload for more flexibility
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
