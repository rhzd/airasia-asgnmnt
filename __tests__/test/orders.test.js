const mongoose = require("mongoose");
const OrderModel = require("../../src/app/models/orders");
var paymentId = require("mongoose").Types.ObjectId();
var roomId = require("mongoose").Types.ObjectId();
var customerId = require("mongoose").Types.ObjectId();

const orderData = {
  checkin_date: '2020-06-21',
  checkout_date: '2020-06-24',
  customer: customerId.toString(),
  room: roomId.toString(),
  total_amount: "58.50",
  payment: paymentId.toString(),
  is_canceled: false,
};

describe("Orders Model Test", () => {
  it("create & save order successfully", async () => {
    const validOrder = new OrderModel(orderData);
    const savedOrder = await validOrder.save();
    expect(savedOrder._id).toBeDefined(); // Object Id should be defined when successfully saved to MongoDB.
    expect(new Date(savedOrder.checkin_date).toISOString()).toBe(new Date(orderData.checkin_date).toISOString());
    expect(new Date(savedOrder.checkout_date).toISOString()).toBe(new Date(orderData.checkout_date).toISOString());
    expect(savedOrder.customer.toString()).toBe(orderData.customer);
    expect(savedOrder.room.toString()).toBe(orderData.room);
    expect(savedOrder.total_amount).toBe(orderData.total_amount);
    expect(savedOrder.payment.toString()).toBe(orderData.payment);
    expect(savedOrder.is_canceled).toBe(orderData.is_canceled);
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert order successfully, but the field does not defined in schema should be undefined", async () => {
    const orderWithInvalidField = new OrderModel({
      checkin_date: Date.now(),
      checkout_date: Date.now() + 1,
      customer: customerId.toString(),
      room: roomId.toString(),
      total_amount: "58.50",
      payment: paymentId.toString(),
      is_canceled: false,
      nickkname: "unit",
    });
    const savedOrderWithInvalidField = await orderWithInvalidField.save();
    expect(savedOrderWithInvalidField._id).toBeDefined();
    expect(savedOrderWithInvalidField.nickkname).toBeUndefined();
  });

  // It should told us the errors in on is_cancelled field.
  it("create order without required field should failed", async () => {
    const orderWithoutRequiredField = new OrderModel({
      checkin_date: Date.now(),
      checkout_date: Date.now() + 1,
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
});
