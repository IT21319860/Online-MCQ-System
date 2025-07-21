const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
  },
  question_text: String,
  options: [String], // Array of options
  correct_option: Number, // Index of the correct option
});

module.exports = mongoose.model('Question', questionSchema);
