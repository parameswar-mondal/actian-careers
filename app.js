const fs = require('fs');
const path = require('path');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const jsYaml = require('js-yaml');

const openPositionsRouter = require('./app/routes/openPositions');
const notFoundHandler = require('./app/middlewares/notFoundHandler');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// parse the YAML file and convert it into a JavaScript object
const schema = jsYaml.load(fs.readFileSync(path.join(__dirname, 'openapi.yaml')));

// api routes
app.use('/api', openPositionsRouter);

// OpenAPI (Swagger) endpoint for testing
// swaggerUI.serve is a middleware function that serves the Swagger UI assets.
// swaggerUI.setup(schema) is a middleware function that sets up the Swagger UI using the provided schema object, 
// which represents the OpenAPI specification.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(schema));

// catch 404 and forward to error handler
app.use(notFoundHandler);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
