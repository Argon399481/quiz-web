import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の問題インデックス
  const [score, setScore] = useState(0); // 正解数
  const [answered, setAnswered] = useState(false); // 問題に回答したかどうか

  useEffect(() => {
    // JSONファイルを読み込む
    fetch("/questions.json")
      .then((response) => response.json()) // JSONとしてパース
      .then((data) => setQuestions(data.questions)) // 問題リストをセット
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  const handleAnswer = (index) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const goToNextQuestion = () => {
    setAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div>
      <h1>クイズアプリ</h1>
      {questions.length > 0 ? (
        <>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <ul>
            {questions[currentQuestionIndex].choices.map((choice, index) => (
              <li key={index}>
                <button onClick={() => handleAnswer(index)} disabled={answered}>
                  {choice}
                </button>
              </li>
            ))}
          </ul>

          {answered && (
            <div>
              <p>
                {answered &&
                questions[currentQuestionIndex].correctAnswer ===
                  questions[currentQuestionIndex].choices.indexOf(
                    questions[currentQuestionIndex].choices[score]
                  )
                  ? "間違えました"
                  : "正解！"}
              </p>
              <button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex >= questions.length - 1}
              >
                次の問題へ
              </button>
            </div>
          )}
        </>
      ) : (
        <p>問題を読み込んでいます...</p>
      )}

      <p>正解数: {score}</p>
    </div>
  );
};

export default App;
