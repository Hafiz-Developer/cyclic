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
const codeGenerator = require('./routes/codeGanerator');
const paymentRoutes = require('./routes/payment');
const accountInfoRoutes = require('./routes/accountInfo');
const sellerPayment = require('./routes/sellerPayment');
const codeMatching = require('./routes/codeMatching');
const dealCancel = require('./routes/dealCancel');
const scammerRoutes = require('./routes/scammer'); // Add this line
const port = process.env.PORT || 5000;

connectDb();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/buySell', buySellRoutes);
app.use('/buySellList', buySellAcntList);
app.use('/social', socialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/codeGenerator', codeGenerator);
app.use('/payment', paymentRoutes);
app.use('/accountInfo', accountInfoRoutes);
app.use('/sellerPayment', sellerPayment);
app.use('/codeMatching', codeMatching);
app.use('/dealCancel', dealCancel); 
app.use('/scammers', scammerRoutes); // Add this line

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
