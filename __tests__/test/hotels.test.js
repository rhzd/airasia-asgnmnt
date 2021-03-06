const mongoose = require("mongoose");
const HotelModel = require("../../src/app/models/hotels");
const hotelData = {
  name: "unittesthotel",
  is_deleted: false,
};

describe("Hotels Model Test", () => {
  it("Create & save hotel successfully", async () => {
    const validHotel = new HotelModel(hotelData);
    const savedHotel = await validHotel.save();
    expect(savedHotel._id).toBeDefined();
    expect(savedHotel.name).toBe(hotelData.name);
    expect(savedHotel.is_deleted).toBe(hotelData.is_deleted);
  });

  it("Insert hotel successfully, but the field that does not defined in schema should be undefined", async () => {
    const hotelWithInvalidField = new HotelModel({
      name: "unittesthotel",
      is_deleted: false,
      nickkname: "unit",
    });
    const savedHotelWithInvalidField = await hotelWithInvalidField.save();
    expect(savedHotelWithInvalidField._id).toBeDefined();
    expect(savedHotelWithInvalidField.nickkname).toBeUndefined();
  });

  it("Create hotel without required field should failed", async () => {
    const hotelWithoutRequiredField = new HotelModel({
      name: "unittesthotel",
    });
    let err;
    try {
      const savedHotelWithoutRequiredField = await hotelWithoutRequiredField.save();
      error = savedHotelWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.is_deleted).toBeDefined();
  });
});
