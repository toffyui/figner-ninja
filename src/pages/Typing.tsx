import React, { useState, useEffect, useRef } from "react";
import { Question } from "../types/Question";
import { getRandomQuestionByDifficulty } from "../libs/getRandomQuestionByDifficulty";
import { Level } from "../types/Level";
import { InputForm } from "../components/InputForm";
import { CorrectAnimation } from "../components/Correct";
import styles from "../styles/Typing.module.scss";
import { Fail } from "../components/Fail";

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
    level === "EASY" ? 30 : level === "NORMAL" ? 60 : 90
  );
  const [score, setScore] = useState<number>(0);
  const [inputKey, setInputKey] = useState<number>(0);
  const typingSound = useRef<HTMLAudioElement | null>(null);
  const failSound = useRef<HTMLAudioElement | null>(null);
  const [showCorrectAnimation, setShowCorrectAnimation] =
    useState<boolean>(false);
  const [showFailAnimation, setShowFailAnimation] = useState<boolean>(false);

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

  const handleCorrectAnswer = () => {
    setShowCorrectAnimation(true);
    resetInputField();
    setQuestion(getRandomQuestionByDifficulty(level));
    setTimeout(() => {
      setShowCorrectAnimation(false);
    }, 1200);
  };

  const handleFailAnswer = () => {
    setShowFailAnimation(true);
    resetInputField();
    setQuestion(getRandomQuestionByDifficulty(level));
    setTimeout(() => {
      setShowFailAnimation(false);
    }, 1200);
  };

  const resetInputField = () => {
    setInputValue("");
    setInputKey((prevKey) => prevKey + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 完全一致のチェック
    if (value === question.kana) {
      setScore((prevScore) => prevScore + value.length);
      handleCorrectAnswer();
      return;
    }
    // 次に期待する文字
    const nextExpectedChar = question.kana[inputValue.length];
    // 現在入力された文字
    const currentInputChar = value[value.length - 1];

    // 入力が進んだ場合のみ判定
    if (currentInputChar === nextExpectedChar) {
      setInputValue(value);
      if (typingSound.current) {
        typingSound.current.currentTime = 0;
        typingSound.current.play();
      }
    } else if (value.length > inputValue.length && !showCorrectAnimation) {
      handleFailAnswer();
      if (failSound.current) {
        failSound.current.currentTime = 0;
        failSound.current.play();
      }
    }
  };

  const renderKanaWithColors = () => {
    return question.kana.split("").map((char, index) => {
      const isCorrect = inputValue[index] === char;
      const color = isCorrect ? "black" : "gray";
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.time}>残り時間: {timeLeft}秒</div>
        <span>点数: {score}</span>
      </div>
      <div className={styles.box}>
        <img src="/images/ninja1.svg" alt="Ninja" className={styles.ninja} />
        <h3 className={styles.kanji}>{question.kanji}</h3>
        <div className={styles.kana}>{renderKanaWithColors()}</div>
      </div>
      {showCorrectAnimation && <CorrectAnimation />}
      {showFailAnimation && <Fail />}
      <InputForm
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        inputKey={inputKey}
      />
      <audio ref={typingSound} src="/sounds/typing.mp3" />
      <audio ref={failSound} src="/sounds/fail.mp3" />
    </div>
  );
};
