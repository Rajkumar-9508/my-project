import express from "express";
import GameResult from "../models/GameResult.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Game result save karna
router.post("/save", protect, async (req, res) => {
  try {
    const { gameName, score, timeTaken } = req.body;

    const result = await GameResult.create({
      userId: req.user._id, // auth se aayega
      gameName,
      score,
      timeTaken,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error saving game result", error: err.message });
  }
});

// Particular user ke sare results nikalna
router.get("/my-results", async (req, res) => {
  try {
    const results = await GameResult.find({ userId: req.user._id });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

export default router;