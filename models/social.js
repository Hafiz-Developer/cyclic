const mongoose = require('mongoose');

const socialAccountSchema = new mongoose.Schema({
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
    monetizationEnabled: { type: Boolean, default: false },
    earningMethod: { type: String, required: true },
    Email: { type: String, required: true },
    otherEmail: { type: String },
    telegramUsername: { type: String },
    pageAge: { type: Number, required: true },
    ContactNumber: { type: Number, required: true },
    monthlyVisitors: { type: Number, required: true },
    reachesMonthly: { type: Number, required: true },
    monthlyEarning: { type: Number, required: true },
    Priority: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Social = mongoose.model('Social', socialAccountSchema);
module.exports = Social;
