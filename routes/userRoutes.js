const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

// Configure multer for file upload
const storage = multer.diskStorage({});
const upload = multer({ storage });
const authenticate = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware

// Define your routes
router.post('/register', upload.single('profileImage'), userController.registerUser);
router.post('/verify-email', userController.verifyEmail);
router.post('/login', userController.loginUser);
router.post('/reset-password-request', userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);


router.put('/update-profile', authenticate, upload.single('profileImage'), userController.updateUserProfile);
router.get('/all', userController.getUsers);
router.post('/request-email-change', authenticate, userController.requestEmailChange);
router.post('/confirm-email-change', authenticate, userController.confirmEmailChange);
// userRoutes.js
router.get('/profile', authenticate, userController.getUserProfile);



module.exports = router;
