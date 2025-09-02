import React from "react";
import "./App.css";
import SkillSync from "./components/SkillSync";
import Orb from "./Orb";

function App() {
  return (
    <div className="App bg-slate-100 min-h-screen font-sans overflow-x-hidden">
      {/* Orb Section */}
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      {/* SkillSync Section */}
      <SkillSync />
    </div>
  );
}

export default App;