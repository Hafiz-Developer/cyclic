const Social = require('../models/social');
const cloudinary = require('../utils/cloudinary');

exports.createSocialAccount = async (req, res) => {
    try {
        const {
            accountName,
            accountType,
            accountPrice,
            accountUrl,
            socialLink1,
            socialLink2,
            socialLink3,
            socialLink4,
            accountDesc,
            monetizationEnabled,
            earningMethod,
            Email,
            otherEmail,
            telegramUsername,
            pageAge,
            monthlyVisitors,
            reachesMonthly,
            monthlyEarning,
            Priority,
            ContactNumber
        } = req.body;

        if (!req.files || req.files.length < 2 || req.files.length > 5) {
            return res.status(400).json({ message: "Please upload between 2 and 5 images." });
        }

        const accountImages = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            accountImages.push(result.secure_url);
        }

        const newSocialAccount = new Social({
            accountName,
            accountType,
            accountPrice,
            accountUrl,
            socialLink1,
            socialLink2,
            socialLink3,
            socialLink4,
            accountImages,
            accountDesc,
            monetizationEnabled,
            earningMethod,
            Email,
            otherEmail,
            telegramUsername,
            pageAge,
            monthlyVisitors,
            reachesMonthly,
            monthlyEarning,
            Priority,
            ContactNumber
        });

        await newSocialAccount.save();

        res.status(201).json({ message: "Social account created successfully", socialAccount: newSocialAccount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSocialAccounts = async (req, res) => {
    try {
        const socialAccounts = await Social.find({}).sort({ createdAt: -1 });
        res.status(200).json(socialAccounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
