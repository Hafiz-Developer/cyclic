const express = require('express');
const router = express.Router();
const multer = require('multer');
const buySellController = require('../controllers/buySellController');
const authenticate = require('../middlewares/authMiddleware'); 
const adminMiddleware = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/create', authenticate , upload.array('accountImages', 5), buySellController.createBuySell);
router.get('/list', authenticate , adminMiddleware , buySellController.getBuySell);

module.exports = router;
