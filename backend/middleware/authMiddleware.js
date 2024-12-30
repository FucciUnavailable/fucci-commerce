// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     req.user = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    // Decode the token using your JWT secret
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Make sure to replace 'your_jwt_secret' with your actual secret

    // Attach the entire decoded payload (including userId) to req.user
    req.user = decoded; // You can store the entire decoded payload for more flexibility
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
