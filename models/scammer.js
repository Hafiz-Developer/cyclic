// models/scammer.js
const mongoose = require('mongoose');

const scammerSchema = new mongoose.Schema({
    sName: {
        type: String,
        required: [true, 'Scammer name is required']
    },
    sContactNumber: {
        type: Number,
        required: [true, 'Scammer contact number is required']
    },
    sCountry: {
        type: String,
        required: [true, 'Scammer country is required']
    },
    sAccountdeal: {
        type: String,
        required: [true, 'Scammer account deal is required']
    },
    sDealingTime: {
        type: Date,
        required: [true, 'Scammer dealing time is required']
    },
    sLink1: { type: String },
    sLink2: { type: String },
    sPics: {
        type: [String],
        required: [true, 'Scammer pictures are required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Scammer = mongoose.model('Scammer', scammerSchema);
module.exports = Scammer;
