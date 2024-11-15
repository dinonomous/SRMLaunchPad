const mongoose = require('mongoose');
const questionSchema = require('./questionSchema')
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  facultyId: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  scheduledStartTime: {
    type: Date
  },
  duration: {
    type: Number, // in minutes
    required: false
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  allowedStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  ],
  questions: [questionSchema]
});

module.exports = testSchema
