const express = require("express");
const Goal = require("../models/Goal");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Get all goals
router.get("/", protect, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json({ success: true, goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create goal
router.post("/", protect, async (req, res) => {
  try {
    const goal = new Goal({
      ...req.body,
      userId: req.user.id,
    });
    await goal.save();
    res.status(201).json({ success: true, goal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update goal
router.put("/:id", protect, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json({ success: true, goal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete goal
router.delete("/:id", protect, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json({ success: true, message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;