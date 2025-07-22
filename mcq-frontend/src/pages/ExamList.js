import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExamList() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/exams").then((res) => setExams(res.data));
  }, []);

  return (
    <div>
      <h2>Select an Exam</h2>
      {exams.map((exam) => (
        <div key={exam._id}>
          <h3>{exam.title}</h3>
          <p>{exam.description}</p>
          <button onClick={() => navigate(`/exam/${exam._id}`)}>Start</button>
        </div>
      ))}
    </div>
  );
}

export default ExamList;
