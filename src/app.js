const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

require('dotenv').config();

// init middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Define your router here

// init routes
app.use('', require('./routes'));

// init db
require("./dbs/init.mongodb");


// handling error
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	return res.status(statusCode).json({
		status: 'error',
		code: statusCode,
		stack: error.stack,
		message: (`Error is here 1:` + error.message) || 'Internal Server Error',
	})
});

module.exports = app;