import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ExamList from "./pages/ExamList";
import ExamAttempt from "./pages/ExamAttempt";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exam/:id" element={<ExamAttempt />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
