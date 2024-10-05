const Admin = require('../models/admin');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/adminVerificationCode');
const jwt = require('jsonwebtoken');
exports.registerAdmin = async (req, res) => {
    try {
        const { email, password, confirmPassword, fullName, secretCode } = req.body;

        if (secretCode !== process.env.SECRET_CODE) {
            return res.status(400).json({ message: "Invalid code" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const verificationCode = crypto.randomBytes(3).toString('hex');
        const verificationCodeExpiry = Date.now() + 3600000; 

        const newAdmin = new Admin({
            email,
            password, 
            fullName,
            verificationCode,
            verificationCodeExpiry
        });

        await newAdmin.save();

        await sendVerificationEmail(process.env.EMAIL_USER, verificationCode, 'email-verification', fullName);

        res.status(200).json({ message: "Registration successful. Please ask the admin to check their email for verification code." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        if (admin.isVerified) {
            return res.status(400).json({ message: "Admin is already verified" });
        }

        if (admin.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        if (Date.now() > admin.verificationCodeExpiry) {
            return res.status(400).json({ message: "Verification code has expired" });
        }

        admin.isVerified = true;
        admin.verificationCode = undefined;
        admin.verificationCodeExpiry = undefined;

        await admin.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!admin.isVerified) {
            return res.status(401).json({ message: "Email not verified" });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({ 
            message: "Login successful", 
            token, 
            admin: {
                id: admin._id,
                email: admin.email,
                fullName: admin.fullName,  
            } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
