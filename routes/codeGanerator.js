const express = require('express');
const router = express.Router();
const { createAccountSeller, getAllAccountsSeller } = require('../controllers/sellerCodeGenerator');
const { createAccountBuyer, getAllAccountsBuyer } = require('../controllers/buyerCodeGanerator');
const authenticate = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.post('/create/buyer', authenticate , createAccountBuyer);
router.get('/all/buyers', authenticate , adminMiddleware , getAllAccountsBuyer);

router.post('/create/seller', authenticate , createAccountSeller);
router.get('/all/sellers', authenticate , adminMiddleware , getAllAccountsSeller);


module.exports = router;

