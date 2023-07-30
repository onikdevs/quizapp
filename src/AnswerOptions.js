import React, { useContext } from "react";
import { QuizContext } from "./Context/QuizContext";
// import _ from "lodash";

export default function AnswerOptions() {
  const { answers, correctAnswer, setPickedAnswer, pickedAnswer } =
    useContext(QuizContext);

  // let [ans1, ans2, ans3, ans4] = answers;
  // const answers = _.shuffle([quiz.correct_answer, ...quiz.incorrect_answers]);
  // const correct_class = pickedAnswer ? "correct_class" : "";
  // const incorrect_class =
  //   pickedAnswer && pickedAnswer !== quiz.correct_answer
  //     ? "incorrect_class"
  //     : "";
  const disabled_class = pickedAnswer && "disabled_class";

  return (
    <div className="answer_options">
      {answers.map((ans, index) => {
        return (
          <div
            key={index}
            onClick={() => setPickedAnswer(ans)}
            className={`answer_option ${
              pickedAnswer && ans === correctAnswer ? "correct_class" : ""
            } ${
              pickedAnswer &&
              ans !== correctAnswer &&
              pickedAnswer !== correctAnswer
                ? "incorrect_class"
                : ""
            } ${disabled_class}`}
          >
            {ans}
          </div>
        );
      })}
      {/* <p>correct_answer- {quiz.correct_answer}</p> */}
    </div>
  );
}
