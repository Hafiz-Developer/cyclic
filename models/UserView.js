const mongoose = require('mongoose');

const userViewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User schema
    accountId: { type: Number, required: true }, // Link to BuySellAccountList schema
}, { timestamps: true });

// Create the model
const UserView = mongoose.model('UserView', userViewSchema);

module.exports = UserView;
