import React, { useEffect, useState } from "react";
import axios from "axios";

function GameHistory() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token"); // login ke baad store hua hoga
        const { data } = await axios.get("http://localhost:5000/api/games/my-results", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err.response?.data || err.message);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>My Game Results</h2>
      <ul>
        {results.map((r) => (
          <li key={r._id}>
            {r.gameName} – Score: {r.score} – Time: {r.timeTaken}s – Date:{" "}
            {new Date(r.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
