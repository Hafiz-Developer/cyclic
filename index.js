const express = require('express');
const app = express();
const connectDb = require('./DataBase/db');
require('dotenv').config();
const buySellRoutes = require('./routes/buySellRoutes');
const buySellAcntList = require('./routes/buySellAcntList');
const userRoutes = require('./routes/userRoutes');
const socialRoutes = require('./routes/social');
const adminRoutes = require('./routes/admin');
const codeGenerator = require('./routes/codeGanerator');
const accountInfoRoutes = require('./routes/accountInfo');
const sellerPayment = require('./routes/sellerPayment');
const codeMatching = require('./routes/codeMatching');
const dealCancel = require('./routes/dealCancel');
const scammerRoutes = require('./routes/scammer'); 
const paymentRoutes = require('./routes/payment'); 
const port = process.env.PORT ; // Default port if not set
const cors = require('cors');
const bodyParser = require('body-parser');

// Connect to the database
connectDb();

// Define allowed origins
const allowedOrigins = [
    process.env.WEBSITE_URL, 
    process.env.ADMIN,  
];

// Use CORS with multiple origins
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from the allowed origins or if the request is from no origin (e.g., Postman)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['POST', 'GET'], // Specify the allowed methods
    credentials: true, // Allow cookies to be sent if needed
}));

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/buySell', buySellRoutes);
app.use('/buySellList', buySellAcntList);
app.use('/social', socialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/codeGenerator', codeGenerator);
app.use('/accountInfo', accountInfoRoutes);
app.use('/sellerPayment', sellerPayment);
app.use('/codeMatching', codeMatching);
app.use('/dealCancel', dealCancel); 
app.use('/scammers', scammerRoutes);
app.use('/stripe', paymentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
