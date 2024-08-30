import React from "react";
import { Level } from "./types/Level";
import { Home } from "./pages/Home";

function App() {
  const onClick = (mode: Level) => {
    console.log(mode);
  };
  return <Home onClick={onClick} />;
}

export default App;
