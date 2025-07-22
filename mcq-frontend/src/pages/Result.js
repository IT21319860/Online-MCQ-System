import React from "react";

function Result() {
  const score = localStorage.getItem("lastScore");

  return (
    <div>
      <h2>Your Score</h2>
      <h3>{score} / 5</h3>
      <a href="/exams">Go Back</a>
    </div>
  );
}

export default Result;
