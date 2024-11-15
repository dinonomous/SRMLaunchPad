const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: false,
  },
  subtopics: [{ type: String, required: false },],
  tests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
  LearningModule: [
    {
      type: Schema.Types.ObjectId,
      ref: "LearningModule",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
