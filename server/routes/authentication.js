const express = require('express');
const { login, googleSignIn, googleCallback, checkAuth, logout } = require('../controllers/auth/authController');
const { register, checkEmail } = require('../controllers/userController');
const router = express.Router();

// Google Sign-in
router.get('/signin/google', googleSignIn);
router.get('/signin/google/callback', googleCallback);

router.post('/login', login);

router.get('/checkAuth', checkAuth);

router.post('/logout', logout);

router.post('/register', register);

router.post('/check-email', checkEmail);

module.exports = router;