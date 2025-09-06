import { useState } from "react";

export default function PreGameName({ defaultName = "", onStart }) {
  const [playerName, setPlayerName] = useState(defaultName);

  return (
    <div className="max-w-sm mx-auto p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Game start se pehle naam dijiye</h2>
      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        className="w-full bg-green-600 text-white p-2 rounded"
        onClick={() => onStart(playerName.trim())}
        disabled={!playerName.trim()}
      >
        Start Game
      </button>
    </div>
  );
}
