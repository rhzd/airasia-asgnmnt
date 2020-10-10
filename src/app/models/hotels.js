const mongoose = require("mongoose"); //Define a schema
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
