const jwt = require('jsonwebtoken');
const {getUserGroups} = require('./user_handler');
const bcrypt = require("bcrypt");

const SECRET_KEY = 'your_secret_key';  // Secret key for JWT signing
const REFRESH_SECRET_KEY = 'your_refresh_secret_key';  // Separate secret for refresh token

exports.generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        groups: getUserGroups(user.id)
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });
};

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

exports.generateCsrfToken = () => {
    return require('crypto').randomBytes(64).toString('hex');
};

exports.validateAccessToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

exports.validateRefreshToken = (token) => {
    try {
        return jwt.verify(token, REFRESH_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

exports.cryptPassword = async (plainPassword) => {
    const saltRounds = 10;  // Salt rounds determine the cost factor of the hashing
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

exports.comparepareHashwords = async (outside, inside) => {
    return await bcrypt.compare(outside, inside);
}