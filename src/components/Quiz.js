import React, { useState, useEffect } from "react";

const Quiz = ({ questions, numberOfQuestions, filter }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    // フィルターに基づいて問題を表示
    const filteredQuestions = applyFilter(questions, filter);
    setQuestions(filteredQuestions);
  }, [filter]);

  const applyFilter = (questions, filter) => {
    if (filter === "unanswered") {
      return questions.filter((q) => !answers.includes(q));
    }
    // 他のフィルター条件（間違えた問題、正解した問題）の処理も追加
  };

  const handleAnswer = (choiceIndex) => {
    const isCorrect = questions[currentQuestion].answer === choiceIndex;
    setAnswers([...answers, currentQuestion]);
    if (isCorrect) setCorrectAnswers(correctAnswers + 1);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div>
      <div>{questions[currentQuestion].question}</div>
      {questions[currentQuestion].choices.map((choice, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {choice}
        </button>
      ))}
      <div>正解率: {(correctAnswers / currentQuestion) * 100}%</div>
    </div>
  );
};

export default Quiz;
