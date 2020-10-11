// the system will store the id for most part,
// so that it will be easier to maintain other module rather than change each model for every data structure changes.

// is_cancelled is used so that the system dont have to delete the data,
// it can be used for audit later.

const mongoose = require("mongoose");
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
