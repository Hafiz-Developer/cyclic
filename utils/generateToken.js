const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, // Include email in the payload
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
};

module.exports = generateToken;
