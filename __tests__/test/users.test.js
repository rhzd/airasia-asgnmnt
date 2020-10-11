const mongoose = require("mongoose");
const UserModel = require("../../src/app/models/users");
const validation = require("../../src/app/validations/users");

const userData = {
  name: "unittest",
  email: "unit@test.com",
  phone_no: "0123456789",
  password: "unittest012",
};

describe("Users Model Test", () => {
  it("Create & save user successfully", async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.phone_no).toBe(userData.phone_no);
    expect(savedUser.password).not.toBe(userData.password); // Password has been hashed so cannot be same as raw password
  });

  it("Insert user successfully, but the field that does not defined in schema should be undefined", async () => {
    const userWithInvalidField = new UserModel({
      name: "unittest",
      email: "unit@test.com",
      phone_no: "0123456789",
      password: "unittest012",
      nickkname: "unit",
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });

  it("Create user without required field should failed", async () => {
    const userWithoutRequiredField = new UserModel({
      name: "unittest",
      email: "unit@test.com",
      phone_no: "0123456789",
    });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
  });

  it("Should return error message if user already exist", async () => {
    let errorMsg = await validation.validUser("unit@test.com");
    expect(errorMsg.error).toBe("User with unit@test.com already exist. Please login to continue");
  });
});
