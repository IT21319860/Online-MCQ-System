import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ExamAttempt() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/exams/${id}/questions`).then((res) => setQuestions(res.data));
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
    <div>
      <h2>Exam</h2>
      {questions.map((q, i) => (
        <div key={q._id}>
          <p>{i + 1}. {q.question_text}</p>
          {q.options.map((opt, idx) => (
            <div key={idx}>
              <input
                type="radio"
                name={q._id}
                checked={answers[q._id] === idx}
                onChange={() => handleSelect(q._id, idx)}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ExamAttempt;
