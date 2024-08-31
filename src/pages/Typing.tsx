import React, { useState, useEffect, useRef } from "react";
import { Question } from "../types/Question";
import { getRandomQuestionByDifficulty } from "../libs/getRandomQuestionByDifficulty";
import { Level } from "../types/Level";

interface TypingScreenProps {
  level: Level;
  onFinish: (score: number) => void;
}

export const Typing: React.FC<TypingScreenProps> = ({ level, onFinish }) => {
  const [question, setQuestion] = useState<Question>(
    getRandomQuestionByDifficulty(level)
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(
    level === "EASY" ? 60 : level === "NORMAL" ? 120 : 180
  );
  const [score, setScore] = useState<number>(0);
  const [inputKey, setInputKey] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onFinish(score);
    }

    return () => clearInterval(timer);
  }, [timeLeft, score, onFinish]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setInputValue("");
    }
  }, [inputKey]);

  const resetInputField = () => {
    setInputKey((prevKey) => prevKey + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === question.kana) {
      setScore((prevScore) => prevScore + value.length);
      resetInputField();
      setQuestion(getRandomQuestionByDifficulty(level));
    }
  };

  const renderKanaWithColors = () => {
    return question.kana.split("").map((char, index) => {
      const isCorrect = inputValue[index] === char;
      const isTyped = index < inputValue.length;
      const color = isCorrect ? "black" : isTyped ? "red" : "gray";
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>残り時間: {timeLeft}秒</h2>
      <div>
        <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>
          {question.kanji}
        </h3>
        <div style={{ fontSize: "20px", marginBottom: "20px" }}>
          {renderKanaWithColors()}
        </div>
      </div>
      <input
        key={inputKey}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        // style={{ opacity: 0, position: "absolute", top: "-9999px" }}
        autoFocus
      />
      <p>点数: {score}</p>
    </div>
  );
};
