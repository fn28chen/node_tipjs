const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
const swagger = require("swagger-generator-express");

require('dotenv').config();

// init middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your router here
const options = {
	title: "swagger-generator-express",
	version: "1.0.0",
	host: "localhost:3000",
	basePath: "/",
	schemes: ["http", "https"],
	securityDefinitions: {
		Bearer: {
			description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
		}
	},
	security: [{Bearer: []}],
	defaultSecurity: 'Bearer'
};

// init routes
app.use('', require('./routes'));

// init db
require("./dbs/init.mongodb");


// handling error

swagger.serveSwagger(app, "/swagger", options, {routePath : './src/routes/'});
module.exports = app;