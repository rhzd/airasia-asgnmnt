const userModel = require("../models/users");

async function validUser(inputEmail) {
  let user = await userModel.findOne({ email: inputEmail }).exec();
  if (user) {
    return {
      error: `User with ${inputEmail} already exist. Please login to continue`,
    };
  }
}

module.exports = { validUser };
