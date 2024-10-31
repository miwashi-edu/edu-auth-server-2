require('dotenv').config();

const DOCKER_NETWORK_RANGE_REGEXP = /^http:\/\/172\.20\.0\.\d{1,3}$/;

// Secure Defaults
const DEFAULT_PORT = process.env.PORT || 3000;
const DEFAULT_HOST = process.env.HOST || '0.0.0.0';
let DEFAULT_SECURE = true;
let DEFAULT_HTTP_ONLY = true;
let DEFAULT_SAME_SITE = 'Strict';
let DEFAULT_CORS_ALLOWED_ORIGINS = ['http://localhost:3000', DOCKER_NETWORK_RANGE_REGEXP];
let DEFAULT_API_DOCS = false;
// Problematic
const ENV = process.env.NODE_ENV || 'development';

// Initialize secrets as undefined
let DEFAULT_ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
let DEFAULT_REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Apply development-specific adjustments
if (ENV === 'development') {
    DEFAULT_ACCESS_TOKEN_SECRET = DEFAULT_ACCESS_TOKEN_SECRET || 'your_access_token_secret_here';
    DEFAULT_REFRESH_TOKEN_SECRET = DEFAULT_REFRESH_TOKEN_SECRET || 'your_refresh_token_secret_here';
    DEFAULT_SECURE = false;
    DEFAULT_SAME_SITE = process.env.SAME_SITE || 'None';
    DEFAULT_CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS
        ? process.env.CORS_ALLOWED_ORIGINS.split(',')
        : DEFAULT_CORS_ALLOWED_ORIGINS;
    DEFAULT_API_DOCS = process.env.API_DOCS || DEFAULT_API_DOCS;
}

// Enforce secrets presence
if (!DEFAULT_ACCESS_TOKEN_SECRET || !DEFAULT_REFRESH_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be set in all environments.");
}

// Final constants for export
const ACCESS_TOKEN_SECRET = DEFAULT_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = DEFAULT_REFRESH_TOKEN_SECRET;
const PORT = DEFAULT_PORT;
const HOST = DEFAULT_HOST;
const SECURE = DEFAULT_SECURE;
const HTTP_ONLY = DEFAULT_HTTP_ONLY;
const SAME_SITE_TYPES = { STRICT: "Strict", LAX: "Lax", NONE: "None" };
const SAME_SITE = SAME_SITE_TYPES[DEFAULT_SAME_SITE.toUpperCase()] || SAME_SITE_TYPES.STRICT;
const CORS_ALLOWED_ORIGINS = DEFAULT_CORS_ALLOWED_ORIGINS;
const API_DOCS = DEFAULT_API_DOCS;

module.exports = {
    ENV,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    PORT,
    HOST,
    SECURE,
    HTTP_ONLY,
    SAME_SITE,
    SAME_SITE_TYPES,
    CORS_ALLOWED_ORIGINS,
    API_DOCS
};
