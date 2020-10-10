const mongoose = require("mongoose"); //Define a schema
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  checkin_date: {
    type: Date,
    trim: true,
    required: true,
  },
  checkout_date: {
    type: Date,
    trim: true,
    required: true,
  },
  customer: { type: Schema.Types.ObjectId, ref: "User" },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
  total_amount: {
    type: String,
    trim: true,
    required: true,
  },
  payment: { type: Schema.Types.ObjectId, ref: "Payment" },
  is_canceled: {
    type: Boolean,
    trim: true,
    required: true,
  }
});
module.exports = mongoose.model("Order", OrderSchema);
