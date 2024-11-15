const mongoose = require('mongoose');
const videoSchema = require("./videoSchema");
const PDFSchema = require('./pdfSchema');

const LearningModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: "Please create a name for the learning module."
  },
  videos: [videoSchema],
  PDF: [PDFSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field before saving
LearningModuleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the LearningModule model from the schema
const LearningModule = mongoose.model('LearningModule', LearningModuleSchema);

// Export the model
module.exports = {LearningModule, LearningModuleSchema};
