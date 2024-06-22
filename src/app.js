const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
require('dotenv').config();

// init middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());

// init routes
app.get("/", (req, res, next) => {
  res.json({
    message: "success",
  });
});
// init db
require("./dbs/init.mongodb");


// handling error

module.exports = app;