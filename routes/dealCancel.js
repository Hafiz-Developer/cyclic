const express = require('express');
const router = express.Router();
const Notification = require('../models/dealCancel');
const nodemailer = require('nodemailer');
const authenticate = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/sendMessage', authenticate , async (req, res) => {
  const { email, adminEmail, sellerEmail } = req.body;

  if (!email || !adminEmail || !sellerEmail) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const notification = new Notification({ email, adminEmail, sellerEmail });
    await notification.save();

    const message = {
      from: process.env.EMAIL_USER,
      to: [email, adminEmail, sellerEmail],
      subject: 'Deal Cancellation Notice',
      text: 'Deal has been canceled.'
    };

    await transporter.sendMail(message);

    res.status(201).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/all', authenticate , adminMiddleware ,  async (req, res) => {
  try {
      const users = await Notification.find().sort({createdAt : -1});

      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
module.exports = router;
