const express = require('express');
const router = express.Router();
const multer = require('multer');
const socialController = require('../controllers/social');
const authenticate = require('../middlewares/authMiddleware'); 
const adminMiddleware = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/create', authenticate , upload.array('accountImages', 5), socialController.createSocialAccount);
router.get('/list', authenticate , adminMiddleware , socialController.getSocialAccounts);

module.exports = router;
