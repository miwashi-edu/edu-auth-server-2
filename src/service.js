const { PORT, AUTH, AUTH_TYPES, HTTP_ONLY, SECURE, SAME_SITE} = require('./config');
const app =require('./app');


app.listen(PORT, err => {
    if (err) {
        console.error(`Failed to start the server: ${err}`);
    } else {
        console.log(`Auth Server Listening on port ${PORT}`);
        console.log(`Using ${AUTH} authentication!`);
        console.log(`HTTPOnly is ${HTTP_ONLY}!`);
        console.log(`Secure is ${SECURE}!`);
        console.log(`Same Site is ${SAME_SITE}!`);
    }
});
