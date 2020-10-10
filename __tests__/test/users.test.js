const mongoose = require("mongoose");
const UserModel = require("../../src/app/models/users");

const userData = {
  name: "unittest",
  email: "unit@test,com",
  phone_no: "0123456789",
  password: "unittest012",
};

describe("Users Model Test", () => {
  it("create & save user successfully", async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save(); 
    expect(savedUser._id).toBeDefined(); // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.phone_no).toBe(userData.phone_no);
    expect(savedUser.password).not.toBe(userData.password); // Password has been hashed so cannot be same as raw password
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert user successfully, but the field does not defined in schema should be undefined", async () => {
    const userWithInvalidField = new UserModel({
      name: "unittest",
      email: "unit@test,com",
      phone_no: "0123456789",
      password: "unittest012",
      nickkname: "unit",
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });

  // It should told us the errors in on password field.
  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new UserModel({
      name: "unittest",
      email: "unit@test,com",
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
});
