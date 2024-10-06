const AccountInfo = require("../models/accountInfo");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { sendAccountInfo } = require("../utils/emailVerification");

exports.createAccountInfo = async (req, res) => {
  try {
    const {
      fullName,
      email,
      adminEmail,
      buyerEmail,
      accountInfo,
      accountDesc,
    } = req.body;
    const accountPic = req.file ? req.file.path : "";

    let accountPicUrl = "";
    if (accountPic) {
      // console.log('Uploading to Cloudinary:', accountPic);
      const result = await cloudinary.uploader.upload(accountPic, {
        folder: "accountPic",
      });
      accountPicUrl = result.secure_url;
      fs.unlinkSync(accountPic);
    }

    const newAccountInfo = new AccountInfo({
      fullName,
      email,
      adminEmail,
      buyerEmail,
      accountInfo,
      accountDesc,
      accountPic: accountPicUrl,
    });

    await newAccountInfo.save();
    await sendAccountInfo(
      fullName,
      email,
      adminEmail,
      buyerEmail,
      accountInfo,
      accountDesc,
      accountPicUrl
    );
    res
      .status(201)
      .json({ message: "Account information created successfully" });
  } catch (error) {
    // console.error('Error in createAccountInfo:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAccountInfo = async (req, res) => {
  try {
    const accountInfos = await AccountInfo.find().sort({ createdAt: -1 });
    res.status(200).json(accountInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
