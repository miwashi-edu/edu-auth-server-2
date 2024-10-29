const {
    SECURE, HTTP_ONLY, SAME_SITE
} = require("../config");
const {
    generateAccessToken, generateRefreshToken, generateCsrfToken,
    validateRefreshToken
} = require('../domain/auth_handler');


/**
 * Logs in a user and sets access and refresh tokens as HTTP-only cookies.
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object used to send back data or tokens.
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).send({ message: "Authentication failed. User not found." });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Authentication failed. Incorrect password." });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const csrfToken = generateCsrfToken();

        res.cookie('accessToken', accessToken, {
            httpOnly: HTTP_ONLY,
            secure: SECURE,
            maxAge: 15 * 60 * 1000,  // 15 minutes
            sameSite: SAME_SITE
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: HTTP_ONLY,
            secure: SECURE,
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
            path: '/refresh',
            sameSite: SAME_SITE
        });

        res.status(200).json({ isLoggedIn: true, csrfToken});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

/**
 * Refreshes the access and refresh tokens for a user and sets them as cookies.
 * @param {Object} req - The request object, which includes the refresh token cookie.
 * @param {Object} res - The response object used to update tokens.
 */
exports.refreshToken = (req, res) => {
    const oldRefreshToken = req.cookies['refreshToken'];
    const userData = validateRefreshToken(oldRefreshToken);

    if (!userData) {
        return res.status(401).send('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(userData);
    const newRefreshToken = generateRefreshToken(userData);

    res.cookie('accessToken', newAccessToken, {
        httpOnly: HTTP_ONLY,
        secure: SECURE,
        maxAge: 15 * 60 * 1000,  // 15 minutes
        sameSite: SAME_SITE
    });

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: HTTP_ONLY,
        secure: SECURE,
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        path: '/refresh',
        sameSite: SAME_SITE
    });

    res.send('Token refreshed successfully');
};

/**
 * Logs out a user by clearing the access and refresh tokens.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the logout confirmation.
 */
exports.logout = (req, res) => {
    res.cookie('accessToken', '', {
        httpOnly: HTTP_ONLY,
        secure: SECURE,
        maxAge: 0,  // Immediately expire the cookie
        sameSite: SAME_SITE
    });

    res.cookie('refreshToken', '', {
        httpOnly: HTTP_ONLY,
        secure: SECURE,
        maxAge: 0,  // Immediately expire the cookie
        path: '/refresh',
        sameSite: SAME_SITE
    });

    res.status(200).send("Logout successful");
};

/**
 * Performs basic authentication using the Authorization header.
 * @param {Object} req - The request object containing the Authorization header.
 * @param {Object} res - The response object used to send back the authentication result.
 */
exports.basicLogin = (req, res) => {
    const authorization = req.headers.authorization || '';
    const [username, password] = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');

    if (username === 'admin' && password === 'password') {  // Replace with real validation logic
        res.status(200).send("Basic login successful");
    } else {
        res.status(401).send("Authentication failed");
    }
};

/**
 * Performs basic authentication using the Authorization header.
 * @param {Object} req - The request object containing the Authorization header.
 * @param {Object} res - The response object used to send back the authentication result.
 */
exports.customLogin = (req, res) => {
    res.status(200).send("Custom login successful");
};