const mongoose = require("mongoose");

const availableRoomsSchema = new mongoose.Schema({
  ac: { type: Number, default: 5 },
  nonAc: { type: Number, default: 5 },
});

module.exports = mongoose.model("AvailableRooms", availableRoomsSchema);
