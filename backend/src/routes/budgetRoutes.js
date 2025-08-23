const express = require("express");
const Budget = require("../models/Budget");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Get all budgets
router.get("/", protect, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.json({ success: true, budgets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create budget
router.post("/", protect, async (req, res) => {
  try {
    const budget = new Budget({
      ...req.body,
      userId: req.user.id,
    });
    await budget.save();
    res.status(201).json({ success: true, budget });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update budget
router.put("/:id", protect, async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json({ success: true, budget });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete budget
router.delete("/:id", protect, async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json({ success: true, message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;