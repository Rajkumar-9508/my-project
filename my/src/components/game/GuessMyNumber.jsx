import React, { useState, useEffect } from "react";
import EmojiFlipGame from "./EmojiFlipGame";

function GuessMyNumber({ onClose, onNext }) {
  const minNum = 1;
  const maxNum = 20;

  const [secretNumber, setSecretNumber] = useState(null);
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [showEmojiGame, setShowEmojiGame] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  function generateSecretNumber() {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  }

  function resetGame() {
    setSecretNumber(generateSecretNumber());
    setScore(20);
    setGuess("");
    setMessage("");
  }

  function checkGuess(e) {
    e.preventDefault();
    const numGuess = Number(guess);

    if (!numGuess || numGuess < minNum || numGuess > maxNum) {
      setMessage(`Enter number between ${minNum} and ${maxNum}`);
      return;
    }

    if (numGuess === secretNumber) {
      setMessage("👍 Correct Number!");
      if (score > highscore) setHighscore(score);
    } else {
      if (score <= 1) {
        setMessage("⚠️ Game Over!");
        setScore(0);
      } else {
        setMessage(numGuess > secretNumber ? "📈 Too High!" : "📉 Too Low!");
        setScore(score - 1);
      }
    }
  }

  if (showEmojiGame) {
    return <EmojiFlipGame onClose={() => setShowEmojiGame(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative bg-gray-900 text-white p-6 rounded-xl shadow-lg w-[500px] max-w-full text-center">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-red-400"
        >
          ❌
        </button>

        {/* Top Controls */}
        <div className="flex justify-between mb-4">
          <button
            onClick={resetGame}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            AGAIN!
          </button>
          <p className="text-sm">
            (Between {minNum} and {maxNum})
          </p>
        </div>

        {/* Title */}
        <h1 className="text-3xl mb-6">Guess My Number!</h1>

        {/* Number Display */}
        <div
          className={`mx-auto w-28 h-24 flex items-center justify-center text-5xl font-bold rounded mb-6 ${
            message === "👍 Correct Number!"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {message === "👍 Correct Number!" ? secretNumber : "?"}
        </div>

        {/* Input & Button */}
        <form onSubmit={checkGuess} className="space-y-4">
          <input
            type="number"
            value={guess}
            min={minNum}
            max={maxNum}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your Guess"
            className="w-32 h-16 text-2xl text-center border-2 border-white bg-transparent rounded"
          />
          <br />
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
          >
            Check!
          </button>
        </form>

        {/* Message */}
        <p className="mt-4 text-lg">{message}</p>

        {/* Scoreboard */}
        <div className="mt-6 text-left inline-block">
          <p>💯 Score: {score}</p>
          <p>🥇 Highscore: {highscore}</p>
        </div>

        {/* ✅ Next Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowEmojiGame(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuessMyNumber;
