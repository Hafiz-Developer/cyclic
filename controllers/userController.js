const crypto = require('crypto');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/emailVerification');
const cloudinary = require('../utils/cloudinary');  // Import cloudinary here
const generateToken = require('../utils/generateToken');
exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationCodeExpiry = Date.now() + 3600000; // 1 hour

        let profileImageUrl = '';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profileImageUrl = result.secure_url;
        }

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpiry,
            profileImage: profileImageUrl,  // Add this line
        });

        await newUser.save();

        // Send email with verification code
        await sendVerificationEmail(email, verificationCode, 'email-verification');

        res.status(201).json({ message: "User registered. Please verify your email." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email first" });
        }

        const token = generateToken(user); // Use the generateToken utility

        res.status(200).json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, profileImage: user.profileImage } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (user.verificationCode !== verificationCode || user.verificationCodeExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpiry = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        await user.save();

        // Send the reset token via email
        await sendVerificationEmail(email, resetToken, 'password-reset');

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        const user = await User.findOne({ resetToken, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateUserProfile = async (req, res) => {
    try {
        const { fullName} = req.body;

        const user = await User.findById(req.user.id); // Assuming you have middleware that sets req.user

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (fullName) user.fullName = fullName;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            user.profileImage = result.secure_url;
        }

        await user.save();

        res.status(200).json({ 
            message: "Profile updated successfully", 
            user: { 
                id: user._id, 
                fullName: user.fullName, 
                profileImage: user.profileImage 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email profileImage isVerified').sort({createdAt : -1}); // Fetch specific fields

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.requestEmailChange = async (req, res) => {
    try {
        const { newEmail } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        user.verificationCodeExpiry = Date.now() + 3600000; // 1 hour expiry

        await user.save();

        // Send the verification code to the current email
        await sendVerificationEmail(user.email, verificationCode, 'email-change');

        res.status(200).json({ message: 'Verification code sent to your current email' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.confirmEmailChange = async (req, res) => {
    try {
        const { newEmail, verificationCode } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verificationCode !== verificationCode || user.verificationCodeExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        user.email = newEmail;
        user.verificationCode = null;
        user.verificationCodeExpiry = null;

        await user.save();

        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // Assuming req.user is set by your authentication middleware
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

