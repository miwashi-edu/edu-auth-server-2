const {
        ENV,
        PORT,
        HOST,
        AUTH, AUTH_TYPES,
        HTTP_ONLY,
        SECURE,
        SAME_SITE,
        CORS_ALLOWED_ORIGINS,
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET,
        API_DOCS
} = require('./config');

const app = require('./app');

const printConfig = () => {
    console.log("Server Configuration:");
    console.log(`- ENV: ${ENV}`);
    console.log(`- PORT: ${PORT}`);
    console.log(`- HOST: ${HOST}`);
    console.log(`- AUTH: ${AUTH}`);
    console.log(`- AUTH_TYPES: ${AUTH_TYPES}`);
    console.log(`- HTTP_ONLY: ${HTTP_ONLY}`);
    console.log(`- SECURE: ${SECURE}`);
    console.log(`- SAME_SITE: ${SAME_SITE}`);
    console.log(`- CORS_ALLOWED_ORIGINS: ${CORS_ALLOWED_ORIGINS.join(', ')}`);
    console.log(`- ACCESS_TOKEN_SECRET: ${ACCESS_TOKEN_SECRET ? 'Set' : 'Not Set'}`);
    console.log(`- REFRESH_TOKEN_SECRET: ${REFRESH_TOKEN_SECRET ? 'Set' : 'Not Set'}`);
    console.log(`- API_DOCS: ${API_DOCS}`);
};

app.listen(PORT, (err) => {
    if (err) {
        console.error(`Failed to start the server: ${err}`);
    } else {
        console.log(`Auth Server Listening on ${HOST}:${PORT}`);
        printConfig();
    }
});
