import React, { useState } from "react";
import { Level } from "./types/Level";
import { Home } from "./pages/Home";
import { Typing } from "./pages/Typing";

function App() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const onClick = (mode: Level) => {
    setSelectedLevel(mode);
  };

  const handleFinish = (score: number) => {
    setFinalScore(score);
    setSelectedLevel(null);
  };

  return (
    <div>
      {selectedLevel ? (
        <Typing level={selectedLevel} onFinish={handleFinish} />
      ) : (
        <Home onClick={onClick} />
      )}
      {finalScore !== null && <div>Final Score: {finalScore}</div>}
    </div>
  );
}

export default App;
