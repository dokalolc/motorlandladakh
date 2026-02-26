const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST review
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    const { name, rating, message } = req.body;
    if (!name || !message || !rating) {
      return res.status(400).json({ msg: "Missing fields" });
    }
    const review = new Review({ name, rating, message });
    await review.save();
    res.json({ msg: "Review saved" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE review by ID
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.json({ msg: "Review deleted" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;