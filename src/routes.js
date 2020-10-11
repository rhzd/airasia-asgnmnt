const { Router } = require("express");
const users = require("../src/routes/users");
const hotels = require("../src/routes/hotels");
const rooms = require("../src/routes/rooms");
const orders = require("../src/routes/orders");
const payments = require("../src/routes/payments");
const { capitalize } = require("../src/app/utils");

var jwt = require("jsonwebtoken");

const routes = Router();

routes.get("/", function (req, res) {
  res.json({ tutorial: "AirAsia backend assignment" });
});

routes.use("/api/users", users);
routes.use("/api", validateUser, hotels);
routes.use("/api", validateUser, rooms);
routes.use("/api", validateUser, orders);
routes.use("/api", validateUser, payments);

routes.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle errors
routes.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong." });
});

function validateUser(req, res, next) {
  // Express headers are auto converted to lowercase
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    jwt.verify(token, req.app.get("secretKey"), function (err, decoded) {
      if (err) {
        res.status(401).json({ message: capitalize(err.message) });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please login" });
  }
}

module.exports = routes;
