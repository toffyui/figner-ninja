import React, { useState } from "react";
import { Level } from "./types/Level";
import { Home } from "./pages/Home";
import { Typing } from "./pages/Typing";
import { Score } from "./components/Score";

function App() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [status, setStatus] = useState<"home" | "typing" | "result">("home");

  const onClick = (mode: Level) => {
    setSelectedLevel(mode);
    setStatus("typing");
  };

  const handleFinish = (score: number) => {
    setFinalScore(score);
    setStatus("result");
    setSelectedLevel(null);
  };

  return (
    <div>
      {status === "home" && <Home onClick={onClick} />}
      {status === "typing" && (
        <Typing level={selectedLevel!} onFinish={handleFinish} />
      )}
      {status === "result" && (
        <Score score={finalScore!} level={selectedLevel!} />
      )}
    </div>
  );
}

export default App;
