import GameResult from "../models/GameResult.js";

export const submitResult = async (req, res) => {
  try {
    const { playerName, finalScore, totalTime } = req.body;
    if (!playerName || finalScore == null || totalTime == null) {
      return res.status(400).json({ message: "playerName, finalScore & totalTime required" });
    }
    const result = await GameResult.create({
      user: req.session.userId,
      playerName,
      finalScore,
      totalTime,
    });
    res.status(201).json({ result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const myResults = async (req, res) => {
  try {
    const items = await GameResult.find({ user: req.session.userId })
      .sort({ createdAt: -1 });
    res.json({ results: items });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
