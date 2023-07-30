import React, { useContext } from "react";
import { QuizContext } from "./Context/QuizContext";

export default function QuestionCard(props) {
  const { quiz } = useContext(QuizContext);
  return <div className="question">{quiz.question}</div>;
}
