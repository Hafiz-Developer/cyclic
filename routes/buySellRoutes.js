const express = require('express');
const router = express.Router();
const multer = require('multer');
const buySellController = require('../controllers/buySellController');

// Configure multer for file upload
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/create', upload.array('accountImages', 5), buySellController.createBuySell);
router.get('/list', buySellController.getBuySell);

module.exports = router;
