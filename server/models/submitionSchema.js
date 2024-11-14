const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
  testId: {
    type: Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      selectedOptions: [
        {
          type: Schema.Types.ObjectId,
        },
      ], // For multiple choice questions
      textAnswer: {
        type: String,
      },
      codeAnswer: {
        language: {
          type: String,
        },
        code: {
          type: String,
        },
      },
      timeSpentSeconds: {
        type: Number,
      },
    },
  ],
  score: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["submitted", "in-progress", "graded"],
    default: "in-progress",
  },
});

module.exports = {
  Submission: mongoose.model("Submission", submissionSchema),
};
