// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  adminEmail: {
    type: String,
    required: true
  },
  sellerEmail: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentPic: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
