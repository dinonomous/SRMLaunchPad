const mongoose = require('mongoose');

// Define question schema first
const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    explanation: { type: String }
});

// Define quiz schema using questionSchema
const quizSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    title: { type: String, required: true },
    questions: [
        questionSchema
    ]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;