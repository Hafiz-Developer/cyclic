const mongoose = require('mongoose');

const buySellAcntlistSchema = new mongoose.Schema({
    accountType: { type: String, required: true },
    accountId: { type: Number, unique: true },  // Auto-generated ID
    accountName: { type: String, required: true },
    accountPrice: { type: Number , required: true },
    accountUrl: { type: String, required: true },
    siteAge: { type: String, required: true },
    accountDesc: { type: String},
    monetizationEnabled: { type: String },
    earningMethod: { type: String },
    SellerEmail: { type: String, required: true },
    SellerFullName: { type: String, required: true },
    MonthlyProfit: { type: String },
    ProfitMargin: { type: String },
    PageViews: { type: String },
    ProfitMultiple: { type: String },
    RevenueMultiple: { type: String },
    imagesUpload1: { type: String },  
    imagesUpload2: { type: String },
    imagesUpload3: { type: String },
    imagesUpload4: { type: String },
    imagesUpload5: { type: String },
}, { timestamps: true });

// Before saving, generate a unique accountId
buySellAcntlistSchema.pre('save', async function (next) {
    if (!this.accountId) {
        const latestAccount = await BuySellAccountList.findOne().sort({ accountId: -1 });
        this.accountId = latestAccount ? latestAccount.accountId + 1 : 1;
    }
    next();
});

// Create the Model
const BuySellAccountList = mongoose.model('BuySellAccountList', buySellAcntlistSchema);

module.exports = BuySellAccountList;
