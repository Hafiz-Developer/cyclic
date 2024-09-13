const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/register', adminController.registerAdmin);
router.post('/verify-email', adminController.verifyEmail);
router.post('/login', adminController.loginAdmin);

module.exports = router;
