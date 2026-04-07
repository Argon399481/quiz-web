import React, { useState, useEffect } from "react";
import "./App.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [answered, setAnswered] = useState(false);
  const [correctAnswerCount, setcorrectAnswerCount] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [highlightedChoices, setHighlightedChoices] = useState([]); // 正解選択肢のハイライト用
  const [correctAnswerText, setCorrectAnswerText] = useState(""); // 自由記述の正解を表示

import React, { useState, useEffect } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedFile, setSelectedFile] = useState("questions.json");

  useEffect(() => {
    fetch(`/quiz-web/${selectedFile}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.questions) {
          setQuestions(data.questions);
        } else {
          setQuestions([]);
        }
      })
      .catch((error) => {
        console.error("Error loading questions:", error);
        setQuestions([]);
      });
  }, [selectedFile]); // selectedFile が変わったら再読み込み

  if (questions.length === 0) {
    return (
      <div>
        <FileSelector
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <p>
          問題ファイルが読み込まれませんでした...作成者に問い合わせてください。
        </p>
      </div>
    );
  }

  return (
    <div>
      <FileSelector selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      {/* ここに questions を使ったクイズ表示 */}
      {questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.question}</p>
        </div>
      ))}
    </div>
  );
}

// ファイル選択用コンポーネント
function FileSelector({ selectedFile, setSelectedFile }) {
  const files = ["questions.json", "questions2.json", "questions3.json"]; // public に置いたファイル

  return (
    <select
      value={selectedFile}
      onChange={(e) => setSelectedFile(e.target.value)}
    >
      {files.map((file) => (
        <option key={file} value={file}>
          {file}
        </option>
      ))}
    </select>
  );
}

  const handleMultipleChoice = (index) => {
    setSelectedChoices((prevChoices) => {
      if (prevChoices.includes(index)) {
        return prevChoices.filter((choice) => choice !== index);
      } else {
        return [...prevChoices, index];
      }
    });
  };

  const handleTextAnswer = (event) => {
    setAnswerText(event.target.value);
  };

  const handleAnswer = () => {
    const currentQuestion = questions[questionIndex];

    let isCorrect = false;

    if (currentQuestion.type === "single") {
      isCorrect = currentQuestion.correctAnswer === selectedChoices[0];
    } else if (currentQuestion.type === "multiple") {
      if (
        Array.isArray(currentQuestion.correctAnswer) &&
        Array.isArray(selectedChoices)
      ) {
        isCorrect =
          JSON.stringify(currentQuestion.correctAnswer.sort()) ===
          JSON.stringify(selectedChoices.sort());
      }
    } else if (currentQuestion.type === "text") {
      isCorrect =
        currentQuestion.correctAnswer.toLowerCase() ===
        answerText.toLowerCase();
    }

    if (isCorrect) {
      setcorrectAnswerCount((prevCount) => prevCount + 1);
      setFeedback("正解！");
      setHighlightedChoices([]);
      setCorrectAnswerText("");
    } else {
      setFeedback("不正解");
      if (currentQuestion.type === "single") {
        setHighlightedChoices([currentQuestion.correctAnswer]);
      } else if (currentQuestion.type === "multiple") {
        setHighlightedChoices(currentQuestion.correctAnswer || []);
      } else if (currentQuestion.type === "text") {
        setCorrectAnswerText(`正解: ${currentQuestion.correctAnswer}`);
      }
    }

    setAnswered(true);

    // **プログレスバーを更新**
    const newProgress = ((questionIndex + 1) / questions.length) * 100;
    document.querySelector(".progress").style.width = `${newProgress}%`;
  };

  const handleNext = () => {
    if (questionIndex + 1 < questions.length) {
      setAnswered(false);
      setSelectedChoices([]);
      setAnswerText("");
      setFeedback("");
      setHighlightedChoices([]);
      setCorrectAnswerText("");
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuestionIndex(questions.length); // 終了画面へ
    }
  };

  // 配列をランダムに並び替える関数
  const shuffleArray = (array) => {
    const shuffled = array.slice(); // 元の配列を変更しないようにコピー
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleStartQuiz = () => {
    // クイズ開始時に questions をシャッフル
    const shuffledQuestions = shuffleArray(questions);
    setQuestions(shuffledQuestions);

    setQuizStarted(true);
    setQuestionIndex(0);
    setcorrectAnswerCount(0);
    setAnswered(false);
    setFeedback("");
    setHighlightedChoices([]);
    setCorrectAnswerText("");
  };

  const handleReturnToTitle = () => {
    setQuizStarted(false);
  };

  const currentQuestion = questions[questionIndex];

  return (
    <div>
      {!quizStarted ? (
        <div>
          <h1>クイズへようこそ！</h1>
          <button onClick={handleStartQuiz}>クイズを開始</button>
        </div>
      ) : (
        <>
          {questionIndex < questions.length ? (
            <>
              <h2>{currentQuestion.question}</h2>
              {currentQuestion.type === "single" && (
                <div>
                  {currentQuestion.choices.map((choice, index) => (
                    <label
                      key={index}
                      className={
                        highlightedChoices.includes(index) ? "highlight" : ""
                      }
                    >
                      <input
                        type="radio"
                        name="singleChoice"
                        value={index}
                        checked={selectedChoices[0] === index}
                        onChange={() => setSelectedChoices([index])}
                        disabled={answered}
                      />
                      {choice}
                    </label>
                  ))}
                </div>
              )}
              {currentQuestion.type === "multiple" && (
                <div>
                  {currentQuestion.choices.map((choice, index) => (
                    <label
                      key={index}
                      className={
                        highlightedChoices.includes(index) ? "highlight" : ""
                      }
                    >
                      <input
                        type="checkbox"
                        checked={selectedChoices.includes(index)}
                        onChange={() => handleMultipleChoice(index)}
                        disabled={answered}
                      />
                      {choice}
                    </label>
                  ))}
                </div>
              )}
              {currentQuestion.type === "text" && (
                <div>
                  <input
                    type="text"
                    value={answerText}
                    onChange={handleTextAnswer}
                    disabled={answered}
                  />
                </div>
              )}
              {feedback && <p>{feedback}</p>}
              {correctAnswerText && <p>{correctAnswerText}</p>}{" "}
              {/* 自由記述の正解を表示 */}
              {!answered ? (
                <button onClick={handleAnswer}>回答</button>
              ) : (
                <button onClick={handleNext}>次の問題</button>
              )}
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${(questionIndex / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="progress-text">
                  {questionIndex + 1} / {questions.length}
                </p>
              </div>
            </>
          ) : (
            <div>
              <h2>クイズは以上です！</h2>
              <p>
                正解数: {correctAnswerCount} / {questions.length}
              </p>
              <p>お疲れさまでした！</p>
              <button onClick={handleReturnToTitle}>タイトルへ戻る</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
