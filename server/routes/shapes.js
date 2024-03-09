const express = require("express");
const DrawingModel = require("../models/Shape");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.post("/save", authenticateUser, async (req, res) => {
  try {
    const { shapes } = req.body;
    const existingDrawing = await DrawingModel.findOne({ user_id: req.user });

    if (existingDrawing) {
      existingDrawing.shapes = shapes;
      await existingDrawing.save();

      res.json({
        success: true,
        message: "Drawing data updated successfully",
        drawing: existingDrawing,
      });
    } else {
      const newDrawing = await DrawingModel.create({
        user_id: req.user,
        shapes,
      });

      res.json({
        success: true,
        message: "Drawing data saved successfully",
        drawing: newDrawing,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server Error",
    });
  }
});

router.get("/getdrawing", authenticateUser, async (req, res) => {
  try {
    const user_id = req.user;
    const drawing = await DrawingModel.findOne({ user_id: user_id });

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
