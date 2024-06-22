"use strict";

const mongoose = require("mongoose");
const { db: {
    host,
    name, 
    port,
}} = require("../configs/configMongo");
const connectionString = `mongodb://${host}:${port}/${name}`;
const { countConnect, checkOverload } = require("../utils/checkConnect");
class Database {
  constructor() {
    this.connect();
  }

  // Connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", {
        color: true,
      });
    }

    mongoose
      .connect(connectionString, {
        maxPoolSize: 30,
      })
      .then((_) => {
        console.log(`Connected to ${connectionString}`);
        countConnect();
        // checkOverload();
      })
      .catch((_) => console.log(`Error connecting to ${connectionString}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
