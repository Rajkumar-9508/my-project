import mongoose from "mongoose";

const gameResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    playerName: { type: String, required: true }, // game start se pehle dala gaya naam
    finalScore: { type: Number, required: true },
    totalTime: { type: Number, required: true }, // seconds/ms, aapka format
  },
  { timestamps: true }
);

export default mongoose.model("GameResult", gameResultSchema);
