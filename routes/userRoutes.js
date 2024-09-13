const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const storage = multer.diskStorage({});
const upload = multer({ storage });
const authenticate = require('../middlewares/authMiddleware'); 
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/register', upload.single('profileImage'), userController.registerUser);
router.post('/verify-email', userController.verifyEmail);
router.post('/login', userController.loginUser);
router.post('/reset-password-request', userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);


router.put('/update-profile', authenticate, upload.single('profileImage'), userController.updateUserProfile);
router.get('/all', authenticate , adminMiddleware , userController.getUsers);
router.post('/request-email-change', authenticate, userController.requestEmailChange);
router.post('/confirm-email-change', authenticate, userController.confirmEmailChange);
router.get('/profile', authenticate, userController.getUserProfile);



module.exports = router;
