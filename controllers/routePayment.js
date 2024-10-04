const stripe = require('stripe')(process.env.SECRET_KEY);
const Payment = require('../models/payment');
const jwt = require('jsonwebtoken');
const { sendPaymentEmail } = require('../utils/emailVerification');
const User = require('../models/payment');

const loadPayment = async (req, res) => {
    try {
        const { accountId, accountType, accountName , accountPrice, totalPriceUSD , fullName, emailAddress, totalPrice, sellerEmail, address, country } = req.query;

        return res.render('payment', {
            publisherKey: process.env.PUBLISHER_KEY,
            fullName,
            emailAddress,
            accountId,
            accountType,
            accountName,
            accountPrice,
            totalPrice,
            amount: totalPriceUSD,
            sellerEmail,
            address, 
            country 
        });
    } catch (error) {
        return res.render('404', { message: error.message });
    }
};

const paymentCharge = async (req, res) => {
    const { token, amount, fullName, emailAddress, accountId, accountType, accountName, totalPrice, accountPrice, sellerEmail, address, country } = req.body;

    try {
        const customer = await stripe.customers.create({
            name: fullName,
            email: emailAddress,
            source: token,
            metadata: { accountId, accountType, accountName, accountPrice, totalPrice, sellerEmail, address, country },
        });

        const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            description: 'Account Payments',
            receipt_email: emailAddress,
            metadata: { fullName, emailAddress, accountId, accountType, accountName, accountPrice, totalPrice, amount, sellerEmail, address, country },
        });

        // console.log({ fullName, emailAddress, accountId, accountType, accountName, totalPrice, accountPrice, amount, sellerEmail, address, country, chargeId: charge.id, customerId: customer.id });

        // Include userId when saving
        const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const payment = new Payment({
            fullName,
            emailAddress,
            accountId,
            accountType,
            accountName,
            accountPrice,
            totalPrice,
            amount,
            sellerEmail,
            address,
            country,
            chargeId: charge.id,
            customerId: customer.id,
            userId, 
        });

        await payment.save();

        // Send notification emails
        const adminEmail = process.env.ADMIN_EMAIL;
        await sendPaymentEmail(emailAddress, sellerEmail, adminEmail, amount , fullName);

        return res.json({ success: true, charge });
    } catch (error) {
        // console.error('Payment Charge Error:', error);
        return res.json({ success: false, error: 'Payment Charge Error:' });
    }
};


const getAll = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // console.log('Token:', token); 
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded Token:', decodedToken); 
        const userId = decodedToken.id; 

        const payments = await Payment.find({ userId }); 
        // console.log('Fetched payments:', payments);
        
        res.json(payments);
    } catch (error) {
        // console.error('Error fetching payments:', error);
        res.status(500).send({ error: 'Error fetching payment history' });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({createdAt : -1}); // Fetch specific fields
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    loadPayment,
    paymentCharge,
    getAll,
    getUsers
};
