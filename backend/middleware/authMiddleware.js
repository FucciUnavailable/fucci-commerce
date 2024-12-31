// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header
  console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzcwNTY3ZWE2NjkwMWFiMzk5ZWIxYTUiLCJuYW1lIjoiZ3V5IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTczNTYxNTgwNiwiZXhwIjoxNzM1NjE5NDA2fQ.hyM4cqsCemfNgtqJYxr_Qtowine4fKYfkrVj7L8HKIw
  console.log(jwtSecret) // 12345weew12325$55bb
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
