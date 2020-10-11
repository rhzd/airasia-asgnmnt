const mongoose = require("mongoose");
const RoomModel = require("../../src/app/models/rooms");
var hotelId = require('mongoose').Types.ObjectId();

const roomData = {
  unit: "A-01-2",
  hotel: hotelId.toString(),
  no_of_guest: 3,
  price: "45.50",
  is_deleted: false,
};

describe("Room Model Test", () => {
  it("Create & save room successfully", async () => {
    const validRoom = new RoomModel(roomData);
    const savedRoom = await validRoom.save();
    expect(savedRoom._id).toBeDefined();
    expect(savedRoom.unit).toBe(roomData.unit);
    expect(savedRoom.hotel.toString()).toBe(roomData.hotel);
    expect(savedRoom.no_of_guest).toBe(roomData.no_of_guest);
    expect(savedRoom.price).toBe(roomData.price);
    expect(savedRoom.is_deleted).toBe(roomData.is_deleted);
  });

  it("Insert room successfully, but the field that does not defined in schema should be undefined", async () => {
    const roomWithInvalidField = new RoomModel({
      unit: "A-01-2",
      hotel: hotelId.toString(),
      no_of_guest: 3,
      price: "45.50",
      is_deleted: false,
      nickkname: "unit",
    });
    const savedRoomWithInvalidField = await roomWithInvalidField.save();
    expect(savedRoomWithInvalidField._id).toBeDefined();
    expect(savedRoomWithInvalidField.nickkname).toBeUndefined();
  });

  it("Create room without required field should failed", async () => {
    const roomWithoutRequiredField = new RoomModel({
      unit: "A-01-2",
      hotel: hotelId.toString(),
      no_of_guest: 3,
      price: "45.50",
    });
    let err;
    try {
      const savedRoomWithoutRequiredField = await roomWithoutRequiredField.save();
      error = savedRoomWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.is_deleted).toBeDefined();
  });
});
