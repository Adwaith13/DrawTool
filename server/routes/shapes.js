const express = require("express");
const DrawingModel = require("../models/Shape");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { shapes } = req.body;
    const newDrawing = await DrawingModel.create({ shapes });
    res.json({
      success: true,
      message: "Drawing data saved successfully",
      drawing: newDrawing,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server Error",
    });
  }
});

router.get("/getdrawing", async (req, res) => {
  try {
    const drawing = await DrawingModel.findOne(); 

    if (!drawing) {
      return res
        .status(404)
        .json({ success: false, message: "Drawing data not found" });
    }

    res.json({ success: true, shapes: drawing.shapes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching drawing data" });
  }
});

module.exports = router;
