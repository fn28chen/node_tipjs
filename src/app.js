const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
require('dotenv').config();

// init middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init routes
app.use('', require('./routes'));

// init db
require("./dbs/init.mongodb");


// handling error

module.exports = app;