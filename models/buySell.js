const mongoose = require('mongoose');

const buySellSchema = new mongoose.Schema({
    accountName: { type: String, required: true },
    accountType: { type: String, required: true },
    accountPrice: { type: Number },
    accountUrl: { type: String, required: true },
    socialLink1: { type: String },
    socialLink2: { type: String },
    socialLink3: { type: String },
    socialLink4: { type: String },
    accountImages: [{ type: String, required: true }],
    accountDesc: { type: String, required: true },
    monetizationEnabled: { type: Boolean, required: true },
    earningMethod: { type: String, required: true },
    Email: { type: String, required: true },
    otherEmail: { type: String },
    telegramUsername: { type: String },
    ContactNumber: { type: Number, required: true },
    siteAge: { type: Number, required: true },
    MonthlyProfit: { type: Number, required: true },
    ProfitMargin: { type: Number, required: true },
    PageViews: { type: Number, required: true },
    ProfitMultiple: { type: String, required: true },
    RevenueMultiple: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
      }
}, { timestamps: true });

const BuySell = mongoose.model('BuySell', buySellSchema);
module.exports = BuySell;
