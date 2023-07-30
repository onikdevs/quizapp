import { useContext } from "react";
import "./App.css";
import QuestionCard from "./QuestionCard";
import AnswerOptions from "./AnswerOptions";
import { QuizContext } from "./Context/QuizContext";

function App() {
  const {
    quizzes,
    questionNumber,
    loadScore,
    totalScore,
    loaded,
    fetchData,
    showScore,
    nextQuestion,
    restart,
    endGame,
  } = useContext(QuizContext);
  return (
    <>
      {!loaded && (
        <button onClick={fetchData} className="startbtn">
          Start Quiz
        </button>
      )}
      {!endGame && (
        <div className="App">
          <header>
            {loaded && (
              <h3 className="qheader">
                Question: {questionNumber}/{quizzes.length}
              </h3>
            )}
          </header>
          {loaded && <QuestionCard />}
          {loaded && <AnswerOptions />}
          {loaded && (
            <button onClick={nextQuestion} className="nextbtn">
              Next
            </button>
          )}
        </div>
      )}
      {endGame && !loadScore && (
        <button className="nextbtn" onClick={showScore}>
          Show Score
        </button>
      )}
      {loadScore && (
        <div>
          <h3 className="qheader">your score is {totalScore}</h3>
          <button className="nextbtn" onClick={restart}>
            Restart Quiz
          </button>
        </div>
      )}
    </>
  );
}

export default App;
