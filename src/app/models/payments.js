const mongoose = require("mongoose"); //Define a schema
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
  status: {
    type: String,
    trim: true,
    required: true,
  },
  name_on_card: {
    type: String,
    trim: true,
    required: false,
  },
  credit_card_no: {
    type: Number,
    trim: true,
    required: false,
  },
  expire_date: {
    type: String,
    trim: true,
    required: false,
  },
  cvv_no: {
    type: Number,
    trim: true,
    required: false,
  },
});
module.exports = mongoose.model("Payment", PaymentSchema);
