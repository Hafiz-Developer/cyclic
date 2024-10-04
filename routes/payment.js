const express = require('express');
const app = express();
const routePayment = require('../controllers/routePayment');
const authenticate = require('../middlewares/authMiddleware'); 
const adminMiddleware = require('../middlewares/adminMiddleware');

app.get('/', authenticate , routePayment.loadPayment);
app.post('/paymentCharge', authenticate , routePayment.paymentCharge);
app.get('/allPayment', authenticate, routePayment.getAll)
app.get('/allUsers', authenticate , adminMiddleware , routePayment.getUsers)

module.exports = app;