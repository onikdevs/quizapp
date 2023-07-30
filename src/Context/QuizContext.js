import { createContext, useState } from "react";
import _ from "lodash";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questionCardIndex, setQuestionCardIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loaded, setloaded] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [pickedAnswer, setPickedAnswer] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [loadScore, setloadScore] = useState(false);

  const fetchData = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
    );
    const { results } = await res.json();
    setQuizzes(results);
    setAnswers(
      _.shuffle([
        results[questionCardIndex].correct_answer,
        ...results[questionCardIndex].incorrect_answers,
      ])
    );
    setCorrectAnswer(results[questionCardIndex].correct_answer);
    setloaded(true);
  };

  const quiz = loaded && quizzes[questionCardIndex];

  function nextQuestion() {
    let currentQuestionIndex = questionCardIndex + 1;
    if (questionNumber < quizzes.length) {
      setQuestionCardIndex(questionCardIndex + 1);
      setQuestionNumber(questionNumber + 1);
      setAnswers(
        _.shuffle([
          quizzes[currentQuestionIndex].correct_answer,
          ...quizzes[currentQuestionIndex].incorrect_answers,
        ])
      );
      setCorrectAnswer(quizzes[currentQuestionIndex].correct_answer);
      if (pickedAnswer !== null && pickedAnswer === correctAnswer) {
        setTotalScore(totalScore + 1);
      } else {
        setTotalScore(totalScore);
      }
      setPickedAnswer(null);
    } else {
      setEndGame(true);
    }
  }
  function showScore() {
    if (pickedAnswer !== null && pickedAnswer === correctAnswer) {
      setTotalScore(totalScore + 1);
    } else {
      setTotalScore(totalScore);
    }
    setloadScore(true);
  }
  function restart() {
    setloaded(false);
    setAnswers(null);
    setCorrectAnswer(null);
    setEndGame(false);
    setTotalScore(0);
    setPickedAnswer(null);
    setQuestionCardIndex(0);
    setloadScore(false);
    setQuestionNumber(1);
  }

  const data = {
    quiz,
    quizzes,
    setPickedAnswer,
    questionNumber,
    answers,
    correctAnswer,
    loadScore,
    totalScore,
    loaded,
    pickedAnswer,
    fetchData,
    showScore,
    nextQuestion,
    restart,
    endGame,
  };
  return <QuizContext.Provider value={data}>{children}</QuizContext.Provider>;
}
