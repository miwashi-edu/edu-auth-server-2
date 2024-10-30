const express = require('express')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const helmet = require('helmet');
const swaggerOptions = require('./swaggerConfig');
const app = express();

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', require('./routes/auth_routes'));
app.use('/api/admin', require('./routes/admin_routes'));

app.use((req, res) => res.status(404).send('Not Found'));

module.exports = app;
