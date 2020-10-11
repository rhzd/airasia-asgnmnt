// is_deleted is used so that the system dont have to delete the data,
// it can be used for audit later.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Hotel", HotelSchema);
