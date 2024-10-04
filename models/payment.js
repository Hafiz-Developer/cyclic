const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    fullName: String,
    emailAddress: String,
    accountId: String,
    accountType: String,
    accountName: String,
    accountPrice: Number,
    amount: Number,
    sellerEmail: String,
    address: String,
    country: String,
    chargeId: String,
    totalPrice:Number,
    customerId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
