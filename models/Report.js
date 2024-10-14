const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true // Ensure that the user ID is provided
    },
    accountId: { 
        type: Number, 
        required: true // Ensure that the account ID is provided
    },
}, { timestamps: true });

// Create the Report model
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
