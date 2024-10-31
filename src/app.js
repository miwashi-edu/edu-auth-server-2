const { API_DOCS, CORS_ALLOWED_ORIGINS } = require('./config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // Make sure to have the cors package installed
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
app.use(express.json());

app.use(helmet({
    contentSecurityPolicy: false,           // Disables CSP to prevent blocking of external/internal resources
    crossOriginEmbedderPolicy: false,        // Allows embedding resources from different origins without restriction
    crossOriginOpenerPolicy: false,          // Disables COOP, which controls cross-origin interactions to prevent data leaks
    crossOriginResourcePolicy: false,        // Disables CORP, which restricts cross-origin resource loading
    dnsPrefetchControl: false,               // Disables DNS prefetching to reduce external network requests
    expectCt: false,                         // Disables Certificate Transparency policy enforcement
    frameguard: { action: 'deny' },          // Prevents the app from being embedded in an iframe
    hidePoweredBy: false,                    // Allows 'X-Powered-By' header, which reveals Express as the server
    hsts: false,                             // Disables HTTP Strict Transport Security (HSTS) for HTTPS enforcement
    ieNoOpen: false,                         // Disables X-Download-Options, which prevents file downloads in IE
    noSniff: false,                          // Disables X-Content-Type-Options, allowing MIME type sniffing
    originAgentCluster: false,               // Disables the Origin-Agent-Cluster header to prevent isolation of origins
    permittedCrossDomainPolicies: false,     // Disables Cross-Domain Policies, which restricts Flash and PDF access
    referrerPolicy: false,                   // Disables referrer policy, allowing full referrer information on requests
    xssFilter: false                         // Disables X-XSS-Protection header, which provides basic XSS protection in older browsers
}));


app.use(helmet.hsts({
    maxAge: 15552000,
    includeSubDomains: true,
    preload: true
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.dnsPrefetchControl({ allow: false }));
app.use(cors({
    origin: (origin, callback) => {
        const isAllowed = CORS_ALLOWED_ORIGINS.some(allowedOrigin => {
            return typeof allowedOrigin === 'string' ? allowedOrigin === origin :
                allowedOrigin.test(origin);
        });

        if (!origin || isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(helmet.contentSecurityPolicy(
    {
        directives: {
            defaultSrc: ["'self'"],  // Restricts all resources to the same origin
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"], // Allows scripts from same origin, inline scripts, and Swagger CDN
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"], // Allows styles from same origin, inline styles, and Swagger CDN
            imgSrc: ["'self'", "data:"], // Allows images from same origin and data URIs for embedded images
            connectSrc: ["'self'"], // Restricts XHR/fetch connections to the same origin, needed by Swagger UI
            objectSrc: ["'none'"] // Disallows <object>, <embed>, and <applet> elements for security
        },
        hsts: false,
    }
));

if(API_DOCS) {
    const swaggerUi = require("swagger-ui-express");
    const swaggerOptions = require('./swaggerConfig');
    app.use("/api-docs", (req, res, next) => {
        res.setHeader("Cache-Control", "no-store"); // Prevents caching
        next();
    });
    app.get('/', (req, res) => {
        res.redirect('/api-docs');
    });
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.use('/api/auth', require('./routes/auth_routes'));
app.use('/api/admin', require('./routes/admin_routes'));

app.use((req, res) => res.status(404).send('Not Found'));

module.exports = app;
