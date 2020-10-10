const mongoose = require("mongoose"); //Define a schema
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  unit: {
    type: String,
    trim: true,
    required: true,
  },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
  no_of_guest: {
    type: Number,
    trim: true,
    required: true,
  },
  price: {
    type: String,
    trim: true,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    trim: true,
    required: true, 
  }
});
module.exports = mongoose.model("Room", RoomSchema);
