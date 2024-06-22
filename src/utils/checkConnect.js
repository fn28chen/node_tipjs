"use strict";

const mongoose = require("mongoose");
const os = require(`os`);
const process = require(`process`);
const _SECONDS = 5000; // Monitor every 5 seconds

const countConnect = () => {
  const numberOfConnection = mongoose.connections.length;
  console.log(`Number of connections: ${numberOfConnection}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numberOfConnection = mongoose.connections.length;
    const numberOfCores = os.cpus().length;
    const memUsage = process.memoryUsage().rss;

    // Assume that the server is overloaded if the number of connections is greater than the number of cores
    const maxConnections = numberOfCores * 5;
    if (numberOfConnection > maxConnections * 0.9) {
      console.log(`Server is overloaded`);
    }
    console.log(`Number of connections: ${numberOfConnection}`);
    console.log(`Number of cores: ${numberOfCores}`);
    console.log(`Memory usage: ${memUsage/1024/1024} MB`);
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
