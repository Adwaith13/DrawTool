const express = require("express");
const DrawingModel = require("../models/Shape");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.post("/save", authenticateUser, async (req, res) => {
  try {
    const { shapes } = req.body;
    const user_id = req.user;

    const updatedDrawing = await DrawingModel.findOneAndUpdate(
      { user_id: user_id },
      { shapes: shapes },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: updatedDrawing
        ? "Drawing data updated successfully"
        : "Drawing data saved successfully",
      drawing: updatedDrawing,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server Error",
    });
  }
});

router.get("/getdrawing", authenticateUser, async (req, res) => {
  try {
    const drawing = await DrawingModel.findOne({ user_id: req.user });

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
