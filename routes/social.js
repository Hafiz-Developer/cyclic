const express = require('express');
const router = express.Router();
const multer = require('multer');
const socialController = require('../controllers/social');

// Configure multer for file upload
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/create', upload.array('accountImages', 5), socialController.createSocialAccount);
router.get('/list', socialController.getSocialAccounts);

module.exports = router;
