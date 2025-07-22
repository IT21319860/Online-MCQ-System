import React from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {
  const score = localStorage.getItem("lastScore");
  const navigate = useNavigate();

  const getMessage = (score) => {
    const s = parseInt(score);
    if (s === 5) return "🏆 Perfect Score! Well done!";
    if (s >= 3) return "👏 Good job!";
    return "🔁 Try again to improve!";
  };

  return (
    <div className="result-container">
      <div className="result-card fade-in">
        <h2>Your Score</h2>
        <div className="score-badge">{score} / 5</div>
        <p className="score-message">{getMessage(score)}</p>
        <button onClick={() => navigate("/exams")}>🔙 Go Back to Exams</button>
      </div>
    </div>
  );
}

export default Result;
