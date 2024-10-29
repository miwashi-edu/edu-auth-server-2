require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret_here';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret_here';

const SAME_SITE_TYPES = {
    STRICT: "Strict",
    LAX: "Lax",
    NONE: "None"
};

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const SECURE = process.env.NODE_ENV === 'production';
const HTTP_ONLY = process.env.HTTP_ONLY || false;

const SAME_SITE = SAME_SITE_TYPES[(process.env.SAME_SITE || 'NONE').toUpperCase()] || SAME_SITE_TYPES.NONE;

module.exports = {
    HOST,
    PORT,
    SECURE,
    HTTP_ONLY,
    SAME_SITE,
    SAME_SITE_TYPES,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
};
