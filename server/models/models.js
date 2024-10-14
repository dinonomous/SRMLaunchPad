const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    explanation: { type: String }
});

const quizSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    title: { type: String, required: true },
    questions: [
        questionSchema
    ]
});

module.exports = quizSchema;