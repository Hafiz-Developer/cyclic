const BuySellAccountList = require("../models/buySellAcntList");


exports.createAccount = async (req, res) => {
    try {
        const newAccount = new BuySellAccountList(req.body);
        await newAccount.save();
        res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.allAccount = async (req, res) => {
    try {
        const accounts = await BuySellAccountList.find({}, {
            SellerEmail: 1,
            SellerFullName: 1,
            accountType: 1,
            accountId: 1,
            accountName: 1,
            accountPrice: 1,
            accountUrl: 1,
            siteAge: 1,
            _id: 1
        });

        const formattedAccounts = accounts.map(account => ({
            sellerDetails: {
                SellerEmail: account.SellerEmail,
                SellerFullName: account.SellerFullName,
                _id: account._id
            },
            accountType: account.accountType,
            accountName: account.accountName,
            accountPrice: account.accountPrice,
            accountUrl: account.accountUrl,
            siteAge: account.siteAge,
            accountId: account.accountId
        }));

        res.status(200).json(formattedAccounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.idGetAccount = async (req, res) => {
    try {
        const account = await BuySellAccountList.findOne({ accountId: req.params.id });

        if (!account) return res.status(404).json({ error: "Account not found" });

        const formattedAccount = {
            sellerDetails: {
                SellerEmail: account.SellerEmail,
                SellerFullName: account.SellerFullName,
                _id: account._id
            },
            accountType: account.accountType,
            accountName: account.accountName,
            accountPrice: account.accountPrice,
            accountUrl: account.accountUrl,
            siteAge: account.siteAge,
            accountDesc: account.accountDesc,
            monetizationEnabled: account.monetizationEnabled,
            earningMethod: account.earningMethod,
            MonthlyProfit: account.MonthlyProfit,
            ProfitMargin: account.ProfitMargin,
            PageViews: account.PageViews,
            ProfitMultiple: account.ProfitMultiple,
            RevenueMultiple: account.RevenueMultiple,
            imagesUpload1: account.imagesUpload1,
            imagesUpload2: account.imagesUpload2,
            imagesUpload3: account.imagesUpload3,
            imagesUpload4: account.imagesUpload4,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
            accountId: account.accountId
        };

        res.status(200).json(formattedAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}