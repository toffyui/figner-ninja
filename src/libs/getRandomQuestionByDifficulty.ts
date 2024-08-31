import { Level } from "../types/Level";
import { easyQuestions } from "../utils/questions/easyQuestions";
import { hardQuestions } from "../utils/questions/hardQuestions";
import { mediumQuestions } from "../utils/questions/mediumQuestions";

export const getRandomQuestionByDifficulty = (difficulty: Level) => {
  switch (difficulty) {
    case "EASY":
      return easyQuestions[Math.floor(Math.random() * easyQuestions.length)];
    case "NORMAL":
      return mediumQuestions[
        Math.floor(Math.random() * mediumQuestions.length)
      ];
    case "HARD":
      return hardQuestions[Math.floor(Math.random() * hardQuestions.length)];
    default:
      return easyQuestions[Math.floor(Math.random() * easyQuestions.length)];
  }
};
