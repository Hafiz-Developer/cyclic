const Account = require('../models/buyerCodeGanerator');

// Create a new account
exports.createAccountBuyer = async (req, res) => {
    try {
        const { fullName, emailAddress, sellerName, accountId, accountType, code } = req.body;

        // Check if the code already exists in the database
        const existingCode = await Account.findOne({ code });
        if (existingCode) {
            return res.status(400).json({ message: "This code already exists. Please choose a different code." });
        }

        // Check if the accountId already exists in the database
        const existingAccountId = await Account.findOne({ accountId });
        if (existingAccountId) {
            return res.status(400).json({ message: "This Account ID already exists. Please choose a different Account ID." });
        }

        const newAccount = new Account({
            fullName,
            emailAddress,
            sellerName,
            accountId,
            accountType,
            code
        });

        const savedAccount = await newAccount.save();
        res.status(201).json(savedAccount);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Extract and send specific validation error messages
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ message: error.message });
    }
};

// Get all accounts
exports.getAllAccountsBuyer = async (req, res) => {
    try {
        const accounts = await Account.find().sort({createdAt: -1});
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
