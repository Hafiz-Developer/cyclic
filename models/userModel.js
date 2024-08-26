const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationCodeExpiry: { type: Date },
    resetToken: String,
    resetTokenExpiry: Date,
    profileImage: { type: String },  
    emailChangeToken: { type: String },
    emailChangeTokenExpiry: { type: Date },
    pendingNewEmail: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
      }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
