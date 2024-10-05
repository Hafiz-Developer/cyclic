const BuySell = require('../models/buySell');
const cloudinary = require('../utils/cloudinary');

exports.createBuySell = async (req, res) => {
    try {
        const {
            accountName, accountType, accountPrice, accountUrl, socialLink1, socialLink2,
            socialLink3, socialLink4, accountDesc, monetizationEnabled, earningMethod,
            Email, otherEmail, telegramUsername, siteAge, MonthlyProfit,
            ProfitMargin, PageViews, ProfitMultiple, RevenueMultiple, ContactNumber,
            paymentAccountVerified, documentsAvailable,
        } = req.body;

        // console.log(req.body); // Log received body data

        // Check for required fields
        const requiredFields = [
            'accountName', 'accountType', 'accountPrice', 'accountUrl', 'accountDesc',
            'Email', 'ContactNumber', 
            'siteAge', 
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `${field} is required.` });
            }
        }

        // Check for images
        if (!req.files || req.files.length < 2 || req.files.length > 5) {
            return res.status(400).json({ message: "Please upload between 2 and 5 images." });
        }

        const accountImages = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            accountImages.push(result.secure_url);
        }

        const newBuySell = new BuySell({
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
            monetizationEnabled: monetizationEnabled === 'true',
            earningMethod,
            Email,
            otherEmail,
            telegramUsername,
            siteAge,
            MonthlyProfit,
            ProfitMargin,
            PageViews,
            ProfitMultiple,
            RevenueMultiple,
            ContactNumber,
            paymentAccountVerified: paymentAccountVerified === 'Yes' || paymentAccountVerified === 'true',
            documentsAvailable: documentsAvailable === 'Yes' || documentsAvailable === 'true',
        });
        // console.log("paymentAccountVerified:", paymentAccountVerified);
        // console.log("documentsAvailable:", documentsAvailable);
        
        await newBuySell.save();
        res.status(201).json({ message: "Account information submitted successfully", buySell: newBuySell });
    } catch (error) {
        // console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};

exports.getBuySell = async (req, res) => {
    try {
        const buySell = await BuySell.find({}).sort({ createdAt: -1 });
        res.status(200).json(buySell);
    } catch (error) {
        // console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};
