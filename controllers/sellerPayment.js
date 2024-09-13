const SellerReceivePayment = require('../models/sellerPayment');

exports.createSellerReceivePayment = async (req, res) => {
  try {
    const { accountId, sendedAmount, paymentMethod, accountNumber, accountName } = req.body;

    const newPayment = new SellerReceivePayment({
      accountId,
      sendedAmount,
      paymentMethod,
      accountNumber,
      accountName,
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment received successfully' });
  } catch (error) {
    // console.error('Error in createSellerReceivePayment:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSellerReceivePayments = async (req, res) => {
  try {
    const payments = await SellerReceivePayment.find().sort({createdAt: - 1});
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
