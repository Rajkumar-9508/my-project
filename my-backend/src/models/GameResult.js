// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // ✅ Model create karo
// const User = mongoose.model("User", userSchema);

// export default User;



import mongoose from "mongoose";

const gameResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // user ke sath link karne ke liye
      ref: "User",
      required: true,
    },
    gameName: { type: String, required: true }, // eg: "GuessMyNumber" or "Quiz"
    score: { type: Number, required: true },
    timeTaken: { type: Number }, // seconds me
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("GameResult", gameResultSchema);