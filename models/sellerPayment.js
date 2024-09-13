// models/sellerReceivePayment.js
const mongoose = require('mongoose');

const sellerReceivePaymentSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    required: true,
  },
  sendedAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('SellerReceivePayment', sellerReceivePaymentSchema);
