// controllers/paymentController.js
const Payment = require('../models/payment');
const cloudinary = require('../utils/cloudinary');
const nodemailer = require('nodemailer');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { fullName, email, adminEmail, sellerEmail, totalPrice, transactionId, transactionDate, paymentMethod, contactNumber } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Payment picture is required' });
    }

    // Upload payment picture to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    // Save payment data to the database
    const newPayment = new Payment({
      fullName,
      email,
      adminEmail,
      sellerEmail,
      totalPrice,
      transactionId,
      transactionDate,
      paymentMethod,
      paymentPic: result.secure_url,
      contactNumber
    });

    await newPayment.save();

    // Send email notifications
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [email, adminEmail, sellerEmail],
      subject: 'Payment Confirmation',
      text: `Payment details:
      
      Full Name: ${fullName}
      Email: ${email}
      Total Price: ${totalPrice}
      Transaction ID: ${transactionId}
      Transaction Date: ${transactionDate}
      Payment Method: ${paymentMethod}
      Contact Number: ${contactNumber}
      Payment Picture URL: ${result.secure_url}
      `,
      html: `
        <p>Payment details:</p>
        <p>Full Name: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Transaction ID: ${transactionId}</p>
        <p>Transaction Date: ${transactionDate}</p>
        <p>Payment Method: ${paymentMethod}</p>
        <p>Contact Number: ${contactNumber}</p>
        <p>Payment Picture:</p>
        <img src="${result.secure_url}" alt="Payment Picture" style="max-width: 100%; height: auto;">
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Payment created and email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
};


const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({createdAt: - 1});
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};


module.exports = {
  createPayment,
  getAllPayments
};