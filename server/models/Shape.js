const mongoose = require("mongoose");

const drawingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shapes: [{ type: Object }],
});

const DrawingModel = mongoose.model("Drawing", drawingSchema);

module.exports = DrawingModel;
