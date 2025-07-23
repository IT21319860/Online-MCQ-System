import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnswers = async () => {
      const lastResult = JSON.parse(localStorage.getItem("lastResult"));
      if (!lastResult) return;

      setScore(lastResult.score);
      setAnswers(lastResult.answers);
    };

    fetchAnswers();
  }, []);

  const getOptionClass = (idx, correctIdx, selectedIdx) => {
    if (idx === correctIdx) return "option correct";
    if (idx === selectedIdx) return "option incorrect";
    return "option";
  };

  return (
    <div className="result-container">
      <div className="result-card fade-in">
        <h2>✅ Your Score</h2>
        <div className="score-badge">{score} / 5</div>

        <h3 className="review-title">Answer Review</h3>
        {answers.map((ans, i) => (
          <div key={i} className="question-block">
            <p className="question-text">
              {i + 1}. {ans.question_text}
            </p>
            {ans.options.map((opt, idx) => (
              <div
                key={idx}
                className={getOptionClass(idx, ans.correct_option, ans.selected_option)}
              >
                {opt}
              </div>
            ))}
          </div>
        ))}

        <button onClick={() => navigate("/exams")}>🔁 Try Another</button>
      </div>
    </div>
  );
}

export default Result;
