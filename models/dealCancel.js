// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  adminEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DealCancel', notificationSchema);
