import React, { useState } from "react";
import PreGameName from "./PreGameName";
import GuessMyNumber from "./game/GuessMyNumber";
import GuessMyNumber from "./game/EmojiFlipGame";

function GameSection() {
  const [playerName, setPlayerName] = useState(null);
  const [currentGame, setCurrentGame] = useState("guess");

  if (!playerName) {
    return <PreGameName onNameSubmit={(name) => setPlayerName(name)} />;
  }

  if (currentGame === "guess") {
    return (
      <GuessMyNumber
        playerName={playerName}
        onClose={() => setPlayerName(null)} // wapas name form pe bhej do
        onNext={() => setCurrentGame("emoji")} // next game khol do
      />
    );
  }

  if (currentGame === "emoji") {
    return (
      <EmojiFlipGame
        playerName={playerName}
        onClose={() => setCurrentGame("guess")} // wapas Guess game pe bhej do
      />
    );
  }

  return null;
}

export default GameSection;
