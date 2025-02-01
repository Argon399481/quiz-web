const Results = ({ correctAnswers, totalQuestions, wrongAnswers }) => {
  return (
    <div>
      <h3>結果</h3>
      <p>正答率: {(correctAnswers / totalQuestions) * 100}%</p>
      <div>
        <h4>間違えた問題</h4>
        {wrongAnswers.map((question, index) => (
          <div key={index}>{question}</div>
        ))}
      </div>
    </div>
  );
};

export default Results;
