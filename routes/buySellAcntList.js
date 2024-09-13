const express = require('express');
const router = express.Router();
const BuySellAccountList = require('../models/buySellAcntList');
const { createAccount, allAccount, idGetAccount, allAccountADmin } = require('../controllers/buySellAcntList');
const authenticate = require('../middlewares/authMiddleware'); 
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/create',  authenticate , adminMiddleware  ,createAccount)


router.get('/all',    allAccount);
router.get('/allAdmin', authenticate , adminMiddleware ,    allAccountADmin);

router.get('/:id' , idGetAccount);


router.put('/update/:id', authenticate , adminMiddleware  , async (req, res) => {
    try {
        const updatedAccount = await BuySellAccountList.findOneAndUpdate({ accountId: req.params.id }, req.body, { new: true });
        if (!updatedAccount) return res.status(404).json({ error: "Account not found" });
        res.status(200).json({ message: `Account Updated successfully`, updatedAccount});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/delete/:id', authenticate , adminMiddleware , async (req, res) => {
    try {
        const deletedAccount = await BuySellAccountList.findOneAndDelete({ accountId: req.params.id });
        if (!deletedAccount) return res.status(404).json({ error: "Account not found" });
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
