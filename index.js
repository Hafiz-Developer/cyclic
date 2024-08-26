const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./DataBase/db');
require('dotenv').config();

const buySellRoutes = require('./routes/buySellRoutes');
const buySellAcntList = require('./routes/buySellAcntList');
const userRoutes = require('./routes/userRoutes');
const socialRoutes = require('./routes/social'); 
const adminRoutes = require('./routes/admin');

const port = process.env.PORT;

// Database connection
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use routes
app.use('/api/users', userRoutes);
app.use('/buySell', buySellRoutes);
app.use('/buySellList', buySellAcntList);
app.use('/social', socialRoutes);
app.use('/api/admin', adminRoutes);

// Create HTTP server and setup Socket.IO


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
