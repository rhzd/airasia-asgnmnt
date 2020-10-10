const mongoose = require("mongoose");
const PaymentModel = require("../../src/app/models/payments");
const paymentData = {
  status: "Open",
  name_on_card: "unit test",
  credit_card_no: 4324254365435432,
  expire_date: "11/23",
  cvv_no: 432,
};

describe("Payment Model Test", () => {
  it("create & save payment successfully", async () => {
    const validPayment = new PaymentModel(paymentData);
    const savedPayment = await validPayment.save();
    expect(savedPayment._id).toBeDefined(); // Object Id should be defined when successfully saved to MongoDB.
    expect(savedPayment.status).toBe(paymentData.status);
    expect(savedPayment.name_on_card).toBe(paymentData.name_on_card);
    expect(savedPayment.credit_card_no).toBe(paymentData.credit_card_no);
    expect(savedPayment.expire_date).toBe(paymentData.expire_date);
    expect(savedPayment.cvv_no).toBe(paymentData.cvv_no);
  });

  // Test Schema
  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert payment successfully, but the field does not defined in schema should be undefined", async () => {
    const paymentWithInvalidField = new PaymentModel({
      status: "Open",
      name_on_card: "unit test",
      credit_card_no: "4324254365435432",
      expire_date: "11/23",
      cvv_no: "432",
      nickkname: "unit",
    });
    const savedPaymentWithInvalidField = await paymentWithInvalidField.save();
    expect(savedPaymentWithInvalidField._id).toBeDefined();
    expect(savedPaymentWithInvalidField.nickkname).toBeUndefined();
  });

  // Test Validation
  // It should us told us the errors in on gender field.
  it("create payment without required field should failed", async () => {
    const paymentWithoutRequiredField = new PaymentModel({
      name_on_card: "unit test",
      credit_card_no: "4324254365435432",
      expire_date: "11/23",
      cvv_no: "432",
    });
    let err;
    try {
      const savedPaymentWithoutRequiredField = await paymentWithoutRequiredField.save();
      error = savedPaymentWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.status).toBeDefined();
  });
});
