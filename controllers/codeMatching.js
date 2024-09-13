const CodeMatching = require('../models/codeMatching');
const axios = require('axios');

const validateCodes = async (sellerCode, buyerCode, accountId) => {
  try {
    const sellerResponse = await axios.get(`${process.env.WEBSITE_URL}/codeGenerator/all/sellers`);
    const buyerResponse = await axios.get(`${process.env.WEBSITE_URL}/codeGenerator/all/buyers`);

    const seller = sellerResponse.data.find((seller) => seller.code === sellerCode && seller.accountId === accountId);
    const buyer = buyerResponse.data.find((buyer) => buyer.code === buyerCode && buyer.accountId === accountId);

    return seller && buyer;
  } catch (error) {
    // console.error('Error validating codes:', error);
    return false;
  }
};

exports.createCodeMatching = async (req, res) => {
  const { accountId, sellerCode, buyerCode } = req.body;

  // console.log('Received request:', { accountId, sellerCode, buyerCode });

  if (!accountId || !sellerCode || !buyerCode) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const isValid = await validateCodes(sellerCode, buyerCode, accountId);

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid seller or buyer code' });
  }

  try {
    const existingRecord = await CodeMatching.findOne({ accountId, sellerCode, buyerCode });

    if (existingRecord) {
      return res.status(400).json({ message: 'Form already exists with the same accountId, sellerCode, and buyerCode' });
    }

    const newCodeMatching = new CodeMatching({
      accountId,
      sellerCode,
      buyerCode,
    });

    await newCodeMatching.save();
    res.status(201).json({ message: 'Code matching created successfully', data: newCodeMatching });
  } catch (error) {
    // console.error('Error creating code matching:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllCodeMatchings = async (req, res) => {
  try {
    const codeMatchings = await CodeMatching.find().sort({ createdAt: -1 });
    res.status(200).json(codeMatchings);
  } catch (error) {
    // console.error('Error fetching code matchings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
