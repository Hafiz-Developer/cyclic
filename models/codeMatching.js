const mongoose = require('mongoose');

const codeMatchingSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    required: true,
  },
  sellerCode: {
    type: Number, 
    required: true,
  },
  buyerCode: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CodeMatching', codeMatchingSchema);
