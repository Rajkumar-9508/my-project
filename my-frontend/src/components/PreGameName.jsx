// import { useState } from "react";
// import { api } from "../api";

// export default function PreGameName({ onSubmit }) {
//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post("/api/games/start", { name });
//       onSubmit(data.player.name); // backend se name confirm
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save name");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
//       <h2 className="text-xl mb-2">Enter your name to start</h2>
//       <input
//         className="border p-2 w-full mb-2 rounded"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Your Name"
//         required
//       />
//       <button className="bg-indigo-600 text-white px-4 py-2 rounded">
//         Start Game
//       </button>
//     </form>
//   );
// }



import React, { useState } from "react";
import axios from "axios";

function PreGameName({ onNameSubmit }) {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      // MongoDB me save karo
      await axios.post("http://localhost:5000/api/games/save-player", {
        name: playerName,
      });

      onNameSubmit(playerName); // Parent ko bhej do
    } catch (err) {
      console.error("Error saving player name:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-[400px] text-center">
        <h2 className="text-xl mb-4">Enter Your Name to Start</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded text-black"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default PreGameName;
