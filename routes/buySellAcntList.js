const express = require('express');
const router = express.Router();
const BuySellAccountList = require('../models/buySellAcntList');
const { createAccount, allAccount, idGetAccount } = require('../controllers/buySellAcntList');

// Create a new account
router.post('/create', createAccount)


// Get all accounts (allFetch)
router.get('/all', allAccount);

// Get account details by ID
router.get('/:id', idGetAccount);


// Update an account by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedAccount = await BuySellAccountList.findOneAndUpdate({ accountId: req.params.id }, req.body, { new: true });
        if (!updatedAccount) return res.status(404).json({ error: "Account not found" });
        res.status(200).json({ message: `Account Updated successfully`, updatedAccount});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an account by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedAccount = await BuySellAccountList.findOneAndDelete({ accountId: req.params.id });
        if (!deletedAccount) return res.status(404).json({ error: "Account not found" });
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
