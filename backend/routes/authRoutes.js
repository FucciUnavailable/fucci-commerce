// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-token', verifyToken);  // Endpoint to verify token
router.get('verify-admin', authMiddleware, (req, res) => {
    if (req.user.isAdmin) {
      return res.json({ isAdmin: true });
    }
    res.status(403).json({ message: 'Access denied' });
  });
  
module.exports = router;
