const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["single_correct", "multi_correct", "code", "text"],
    required: true,
  },
  options: [
    {
      optionText: {
        type: String,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
  encryptedCorrectAnswer: {
    type: String,
    required: false,
  },
  allowedLanguages: [String],
  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
});

module.exports = questionSchema;
