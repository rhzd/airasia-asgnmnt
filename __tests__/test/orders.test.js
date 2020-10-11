const mongoose = require("mongoose");
const OrderModel = require("../../src/app/models/orders");
var paymentId = require("mongoose").Types.ObjectId();
var roomId = require("mongoose").Types.ObjectId();
var customerId = require("mongoose").Types.ObjectId();
const validation = require("../../src/app/validations/orders");

const orderData = {
  checkin_date: "2020-06-21",
  checkout_date: "2020-06-26",
  customer: customerId.toString(),
  room: roomId.toString(),
  total_amount: "58.50",
  payment: paymentId.toString(),
  is_canceled: false,
};

describe("Orders Model Test", () => {
  it("Create & save order successfully", async () => {
    const validOrder = new OrderModel(orderData);
    const savedOrder = await validOrder.save();
    expect(savedOrder._id).toBeDefined();
    expect(new Date(savedOrder.checkin_date).toISOString()).toBe(
      new Date(orderData.checkin_date).toISOString()
    );
    expect(new Date(savedOrder.checkout_date).toISOString()).toBe(
      new Date(orderData.checkout_date).toISOString()
    );
    expect(savedOrder.customer.toString()).toBe(orderData.customer);
    expect(savedOrder.room.toString()).toBe(orderData.room);
    expect(savedOrder.total_amount).toBe(orderData.total_amount);
    expect(savedOrder.payment.toString()).toBe(orderData.payment);
    expect(savedOrder.is_canceled).toBe(orderData.is_canceled);
  });

    it("insert order successfully, but the field that does not defined in schema should be undefined", async () => {
    const orderWithInvalidField = new OrderModel({
      checkin_date: "2020-06-21",
      checkout_date: "2020-06-26",
      customer: customerId.toString(),
      room: roomId.toString(),
      total_amount: "58.50",
      payment: paymentId.toString(),
      is_canceled: false,
      nickkname: "unit",
    });
    const savedPaymentWithInvalidField = await orderWithInvalidField.save();
    expect(savedPaymentWithInvalidField._id).toBeDefined();
    expect(savedPaymentWithInvalidField.nickkname).toBeUndefined();
  });

  it("Create order without required field should failed", async () => {
    const orderWithoutRequiredField = new OrderModel({
      checkin_date: Date.now(),
      checkout_date: Date.now(),
      customer: customerId.toString(),
      room: roomId.toString(),
      total_amount: "58.50",
      payment: paymentId.toString(),
    });
    let err;
    try {
      const savedOrderWithoutRequiredField = await orderWithoutRequiredField.save();
      error = savedOrderWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.is_canceled).toBeDefined();
  });

  it("Should return error message if check-in is larger than check-out", async () => {
    let errorMsg = await validation.validOrder(
      roomId.toString(),
      "2020-06-26",
      "2020-06-24"
    );
    expect(errorMsg.error).toBe(
      "Check-out date should be higher than check-in date"
    );
  });

  it("Should return error message if date is not available", async () => {
    let errorMsg = await validation.validOrder(
      roomId.toString(),
      "2020-06-19",
      "2020-06-22"
    );
    expect(errorMsg.error).toBe("Room not available on selected date");
  });
});
