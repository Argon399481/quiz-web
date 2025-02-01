import React, { useState } from "react";

const Settings = ({ setNumberOfQuestions, setFilter }) => {
  const [questionsCount, setQuestionsCount] = useState(10);
  const [filter, setFilterState] = useState("all");

  const handleChangeQuestionsCount = (event) => {
    setQuestionsCount(event.target.value);
    setNumberOfQuestions(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <div>
        <label>出題数: </label>
        <input
          type="number"
          value={questionsCount}
          onChange={handleChangeQuestionsCount}
        />
      </div>
      <div>
        <label>フィルター: </label>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">すべて</option>
          <option value="unanswered">未出題</option>
          <option value="incorrect">前回間違えた</option>
          <option value="correct">正解した</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
