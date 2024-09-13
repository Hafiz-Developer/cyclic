// routes/payment.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPayment, getAllPayments } = require('../controllers/payment');
const authenticate = require('../middlewares/authMiddleware'); 

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/', authenticate , upload.single('paymentPic'), createPayment);
router.get('/all' , authenticate ,getAllPayments)
module.exports = router;
