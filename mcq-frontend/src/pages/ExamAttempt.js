import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ExamAttempt.css";

function ExamAttempt() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/exams/${id}/questions`)
      .then((res) => setQuestions(res.data));
  }, [id]);

  const handleSelect = (qId, optIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      user_id: user._id,
      exam_id: id,
      answers: Object.keys(answers).map((qid) => ({
        question_id: qid,
        selected_option: answers[qid],
      })),
    };
    const res = await axios.post("http://localhost:5000/api/results/submit", payload);
    localStorage.setItem("lastScore", res.data.score);
    navigate("/results");
  };

  return (
    <div className="exam-container">
      <div className="exam-card fade-in">
        <h2>📝 Attempt Exam</h2>
        {questions.map((q, i) => (
          <div className="question-block" key={q._id}>
            <p className="question-text">
              {i + 1}. {q.question_text}
            </p>
            {q.options.map((opt, idx) => (
              <label key={idx} className={`option ${answers[q._id] === idx ? "selected" : ""}`}>
                <input
                  type="radio"
                  name={q._id}
                  value={idx}
                  checked={answers[q._id] === idx}
                  onChange={() => handleSelect(q._id, idx)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button className="submit-btn" onClick={handleSubmit}>✅ Submit</button>
      </div>
    </div>
  );
}

export default ExamAttempt;
