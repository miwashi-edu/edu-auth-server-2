const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "Auth-Server API",
            description: "API Information of auth-server",
            contact: {
                name: "user@example.com",
                email: "user@example.com"
            },
            servers: [{
                url: "http://localhost:3000",
                description: "Development server"
            }]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'] // Ensure this path is correct from the root of your project
};

module.exports = swaggerOptions;
