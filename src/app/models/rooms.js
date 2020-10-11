// the system will store the hotel id instead of whole hotel object,
// so that it will be easier to maintain each module rather than change each model for every data structure changes.

// is_deleted is used so that the system dont have to delete the data,
// it can be used for audit later.

const mongoose = require("mongoose");
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
