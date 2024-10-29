const express = require('express');
const authController = require("../controllers/auth_controller");
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Logs in a user by username and password, sets access and refresh tokens in HTTP-only cookies.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 example: user123
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: pass1234
 *     responses:
 *       200:
 *         description: User logged in successfully, tokens set in cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isLoggedIn:
 *                   type: boolean
 *                 csrfToken:
 *                   type: string
 *       401:
 *         description: Authentication failed, user not found or incorrect password.
 *       400:
 *         description: Bad request, username or password not provided.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', authController.login);/**

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh the authentication tokens
 *     description: Refreshes the access and refresh tokens for the user.
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully.
 *       401:
 *         description: Invalid refresh token.
 */
router.post('/refresh', authController.refreshToken);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logs out a user
 *     description: Clears the user's authentication tokens.
 *     responses:
 *       200:
 *         description: Logout successful.
 */
router.post('/logout', authController.logout);

module.exports = router;
