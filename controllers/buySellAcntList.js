const BuySellAccountList = require("../models/buySellAcntList");
const UserView = require('../models/UserView'); // Add this import
const Report = require('../models/Report'); // Import the Report model
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
            siteAge: 1,
            accountDesc:1,
            MonthlyProfit:1,
            ProfitMargin:1,
            imagesUpload1:1,
            createdAt:1,
            PageViews:1,
            reportAccount:1,
            monetizationEnabled:1,
            _id: 1
        }).sort({createdAt: - 1});

        const formattedAccounts = accounts.map(account => ({
            sellerDetails: {
                SellerEmail: account.SellerEmail,
                SellerFullName: account.SellerFullName,
                _id: account._id
            },
            monetizationEnabled:account.monetizationEnabled,
            reportAccount:account.reportAccount,
            PageViews:account.PageViews,
            accountType: account.accountType,
            accountName: account.accountName,
            accountPrice: account.accountPrice,
            siteAge: account.siteAge,
            accountId: account.accountId,
            accountDesc: account.accountDesc,
            MonthlyProfit: account.MonthlyProfit,
            ProfitMargin: account.ProfitMargin,
            createdAt: account.createdAt,
            imagesUpload1: account.imagesUpload1
        }));

        res.status(200).json(formattedAccounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.allAccountADmin = async (req, res) => {
    try {
        const accounts = await BuySellAccountList.find();
        res.status(200).json(accounts);
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
            reportAccount: account.reportAccount,
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


exports.incrementViewCount = async (req, res) => {
    const { userId, accountId } = req.body; 
    console.log("Received userId:", userId, "and accountId:", accountId); // Debugging

    try {
        const existingView = await UserView.findOne({ userId, accountId });

        if (!existingView) {
            await BuySellAccountList.findOneAndUpdate(
                { accountId },
                { $inc: { PageViews: 1 } },
                { new: true }
            );

            const newView = new UserView({ userId, accountId });
            await newView.save();

            return res.status(200).json({ message: "View count updated" });
        } else {
            return res.status(200).json({ message: "View already counted" });
        }
    } catch (error) {
        console.error("Error in incrementViewCount:", error); // Debugging
        res.status(400).json({ error: error.message });
    }
};


exports.reportAccount = async (req, res) => {
    const { userId, accountId } = req.body; 
    console.log("Received userId:", userId, "and accountId:", accountId); // Debugging

    try {
        const existingReport = await Report.findOne({ userId, accountId });

        if (!existingReport) {
            await BuySellAccountList.findOneAndUpdate(
                { accountId },
                { $inc: { reportAccount: 1 } }, // Increment report count
                { new: true }
            );

            const newReport = new Report({ userId, accountId });
            await newReport.save();

            return res.status(200).json({ message: "Report submitted and account count updated" });
        } else {
            return res.status(200).json({ message: "Account already reported" });
        }
    } catch (error) {
        console.error("Error in reportAccount:", error); // Debugging
        res.status(400).json({ error: error.message });
    }
};