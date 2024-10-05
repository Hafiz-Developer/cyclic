const mongoose = require('mongoose');

const buySellSchema = new mongoose.Schema({
    accountName: { type: String, required: true },
    accountType: { type: String, required: true },
    accountPrice: { type: Number , required: true },
    accountUrl: { type: String, required: true },
    socialLink1: { type: String },
    socialLink2: { type: String },
    socialLink3: { type: String },
    socialLink4: { type: String },
    accountImages: [{ type: String, required: true }],
    accountDesc: { type: String, required: true },
    monetizationEnabled: { type: Boolean },
    earningMethod: { type: String,},
    paymentAccountVerified:{type:Boolean},
    documentsAvailable:{type:Boolean},
    Email: { type: String, required: true },
    otherEmail: { type: String },
    telegramUsername: { type: String },
    ContactNumber: { type: Number, required: true },
    siteAge: { type: Date, required: true },
    MonthlyProfit: { type: Number,},
    ProfitMargin: { type: Number},
    PageViews: { type: Number,},
    ProfitMultiple: { type: String },
    RevenueMultiple: { type: String},
    createdAt: {
        type: Date,
        default: Date.now
      }
}, { timestamps: true });

const BuySell = mongoose.model('BuySell', buySellSchema);
module.exports = BuySell;
