const Progress = ({ correctAnswers, totalQuestions }) => {
  const progress = (correctAnswers / totalQuestions) * 100;
  return <div>進捗: {progress}%</div>;
};
