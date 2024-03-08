const mongoose = require("mongoose");

const drawingSchema = new mongoose.Schema({
  shapes: [{ type: Object }],
});

const DrawingModel = mongoose.model("Drawing", drawingSchema);

module.exports = DrawingModel;
