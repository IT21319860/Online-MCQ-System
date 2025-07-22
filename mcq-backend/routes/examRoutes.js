const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const Question = require('../models/Question');

// Get all exams
router.get('/', async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
});

// Get questions for an exam
router.get('/:id/questions', async (req, res) => {
  const questions = await Question.find({ exam_id: req.params.id });
  res.json(questions);
});
// Get all exams with question count
router.get('/', async (req, res) => {
  const exams = await Exam.find();

  // Attach question count to each
  const examsWithCounts = await Promise.all(
    exams.map(async (exam) => {
      const count = await Question.countDocuments({ exam_id: exam._id });
      return { ...exam._doc, questionCount: count };  
    })
  );

  res.json(examsWithCounts);
});

module.exports = router;
