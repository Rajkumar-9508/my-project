import React, { useState, useEffect, useRef } from "react";

export default function EmojiFlipGame({ onClose, onNext, playerName }) {
  const emojis = ["😀", "🐶", "🍎", "🚗", "🌟", "🎈", "🏀", "🎵", "📚", "🚀"];
  const BOMB = "💣";

  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    createBoard();
    return () => clearInterval(timerRef.current);
  }, []);

  async function saveGameResult(finalScore, totalTime) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/games/save",
        { gameName: "GuessMyNumber", score: finalScore, timeTaken: totalTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Game result saved!");
    } catch (err) {
      console.error("Error saving result:", err.response?.data || err.message);
    }
  }

  // Jab user sahi guess kare
  const handleWin = () => {
    alert(`🎉 You Won! Score: ${score}`);
    saveGameResult(score, timeTaken); // <-- YAHI CALL KARNA HAI
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    setSeconds(0);
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const createBoard = () => {
    setGameOver(false);
    setWin(false);
    setMoves(0);
    setSeconds(0);

    const cardCount = 12;
    let selectedEmojis = emojis.slice(0, cardCount - 2);
    selectedEmojis.push(BOMB, BOMB);
    const shuffled = shuffle([...selectedEmojis]);

    const newCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
    }));
    setCards(newCards);
    startTimer();
  };

  const flipCard = (id) => {
    if (gameOver) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );

    setMoves((m) => m + 1);

    const clickedCard = cards.find((c) => c.id === id);
    if (clickedCard && clickedCard.emoji === BOMB) {
      endGame();
    } else {
      checkWin([...cards.filter((c) => c.flipped), clickedCard]);
    }
  };

  const endGame = () => {
    setGameOver(true);
    clearInterval(timerRef.current);
  };

  const checkWin = (flippedCards) => {
    const safeCards = flippedCards.filter((c) => c.emoji !== BOMB);
    if (safeCards.length === 10) {
      clearInterval(timerRef.current);
      setWin(true);
      setGameOver(true);
    }
  };

  return (
    <div
      className="fixed inset-0 min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6 z-50"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/be/6c/bf/be6cbf612b172a13bc4bbf06fdb3faae.jpg')",
      }}
    >
      {/* ❌ Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-3xl text-white hover:text-red-400"
      >
        ❌
      </button>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 drop-shadow-md mb-2">
          Emoji Flip Game
        </h1>
        <h3 className="text-lg text-yellow-400 mb-4">(Flip To Reveal)</h3>

        {/* Info Bar */}
        <div className="flex gap-6 bg-white p-4 rounded-lg shadow mb-6 justify-center">
          <button
            className="bg-slate-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Instructions
          </button>
          <div className="text-center">
            <div className="text-xl font-bold">{moves}</div>
            <div className="text-gray-600 text-sm">Score</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{seconds}</div>
            <div className="text-gray-600 text-sm">Seconds</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-20 h-20 flex items-center justify-center rounded-lg cursor-pointer text-2xl font-bold shadow transition-transform duration-500 
              ${card.flipped ? "bg-white text-black rotate-y-180" : "bg-cover"}`}
              style={{
                backgroundImage: card.flipped
                  ? "none"
                  : "url('https://i.pinimg.com/736x/7a/78/ba/7a78ba8345544d530359c1b9522c2ca0.jpg')",
              }}
              onClick={() => !card.flipped && flipCard(card.id)}
            >
              {card.flipped ? card.emoji : ""}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={createBoard}
          >
            New Game
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={createBoard}
          >
            Restart
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            // onClick={createBoard}
          >
            Next ➡️
          </button>
        </div>

        {/* Win Message */}
        {win && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white text-center p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
              <p className="mb-4">You completed the game!</p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={createBoard}
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Game Over */}
        {gameOver && !win && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white text-center p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">💣 Game Over!</h2>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={createBoard}
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Instructions Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative">
              <button
                className="absolute top-2 right-3 text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-2">How to Play</h2>
              <p className="mb-2">
                Flip each card to reveal an emoji. Try to avoid the 💣 bombs hidden
                in the cards!
              </p>
              <p className="mb-2">If you flip a bomb, the game ends immediately.</p>
              <p>Try to flip all safe cards!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
