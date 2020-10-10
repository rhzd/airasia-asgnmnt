const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("morgan");
const bodyParser = require("body-parser");
const databaseHelper = require('./app/helpers/database');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.server.set("secretKey", process.env.SECRET_KEY); 
    this.server.use(logger("dev"));
    this.server.use(bodyParser.urlencoded({ extended: false }));
  }

  database() {
    databaseHelper.connect();
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
