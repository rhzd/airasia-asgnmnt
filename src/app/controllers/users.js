const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  create: function (req, res, next) {
    userModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        password: req.body.password,
      },
      function (err, result) {
        if (err) next(err);
        else
          res.json({
            message: "User added successfully.",
          });
      }
    );
  },
  authenticate: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            message: "Successfully login",
            data: { user: userInfo, token: token },
          });
        } else {
          res.json({
            message: "Invalid email / password!",
            data: null,
          });
        }
      }
    });
  },
};
