const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Submit exam answers
router.post('/submit', async (req, res) => {
  const { user_id, exam_id, answers } = req.body;

  let score = 0;
  const result = await Result.create({ user_id, exam_id, score: 0 });

  for (let ans of answers) {
    const question = await Question.findById(ans.question_id);
    const isCorrect = question.correct_option === ans.selected_option;
    if (isCorrect) score++;

    await Answer.create({
      result_id: result._id,
      question_id: question._id,
      selected_option: ans.selected_option,
      is_correct: isCorrect,
    });
  }

  result.score = score;
  await result.save();

  res.json({ result_id: result._id, score });
});

// View result details
router.get('/:user_id', async (req, res) => {
  const results = await Result.find({ user_id: req.params.user_id }).populate('exam_id');
  res.json(results);
});

module.exports = router;
