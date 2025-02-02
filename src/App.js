import "./App.css";
import React, { useState } from "react";
import Quiz from "./Quiz"; // Quizコンポーネントのインポート

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div>
      <h1>クイズアプリ</h1>
      {!quizStarted ? (
        <button onClick={startQuiz}>はじめる</button>
      ) : (
        <Quiz /> // クイズが始まったらQuizコンポーネントを表示
      )}
    </div>
  );
};

export default App;
