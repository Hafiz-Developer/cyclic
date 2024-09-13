const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    emailAddress: {
        type: String,
        required: [true, 'Email address is required'],
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    buyerName: {
        type: String,
        required: [true, 'Buyer name is required']
    },
    paymentForBuyer: {
        type: String,
        required: [true, 'Payment  is required'],
        unique: true
    },
    accountId: {
        type: Number,
        required: [true, 'Account ID is required'],
        unique: true
    },
    accountType: {
        type: String,
        required: [true, 'Account type is required']
    },
    code: {
        type: Number,
        required: [true, 'Code is required'],
        validate: {
            validator: function(v) {
                return /^\d{8}$/.test(v);
            },
            message: props => 'Code must be exactly 8 digits'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
}, { timestamps: true });

module.exports = mongoose.model('sellerCode', accountSchema);
