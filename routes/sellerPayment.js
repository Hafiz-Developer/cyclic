const express = require('express');
const router = express.Router();
const { createSellerReceivePayment, getAllSellerReceivePayments } = require('../controllers/sellerPayment');
const authenticate = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/create', authenticate , createSellerReceivePayment);
router.get('/all', authenticate , adminMiddleware , getAllSellerReceivePayments);

module.exports = router;
