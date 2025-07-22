import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ExamList.css";

function ExamList() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/exams").then((res) => setExams(res.data));
  }, []);

  const icons = ["🧠", "💻", "📐", "📘", "🔬"];

  return (
    <div className="exam-list-container">
      <h2 className="exam-title">📚 Select an Exam</h2>
      <div className="exam-grid">
        {exams.map((exam, index) => (
          <div key={exam._id} className="exam-card fade-in">
            <div className="exam-icon">{icons[index % icons.length]}</div>
            <h3>{exam.title}</h3>
            <p>{exam.description}</p>
            <p className="question-count">
              {exam.questionCount ?? 5} Questions
            </p>
            <button onClick={() => navigate(`/exam/${exam._id}`)}>Start ➡️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamList;
