// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-token', verifyToken);  // Endpoint to verify token

module.exports = router;
