const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 
const Admin = require('../models/admin'); 
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "Authorization denied. Please login first." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id) || await Admin.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Authorization denied. User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authorization denied. Please login first." });
    }
};

module.exports = authMiddleware;
