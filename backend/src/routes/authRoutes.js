// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, verifyEmail, login, resendVerification, forgotPassword, resetPassword } = require('../controllers/authController');

// Add this route specifically for email verification
router.get('/verify-email', verifyEmail);  
router.post('/register', register);
router.post('/login', login);
router.post('/resend-verification', resendVerification);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword)

module.exports = router;