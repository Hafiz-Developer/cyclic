const mongoose = require('mongoose');

const accountInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  buyerEmail: {
    type: String,
    required: true,
  },
  accountInfo: {
    type: String,
    required: true,
  },
  accountPic: {
    type: String, // Store URL only
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AccountInfo', accountInfoSchema);
