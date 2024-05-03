const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const unitSchema = new mongoose.Schema({
  title: String,
  videos: [
    {
      title: String,
      url: String
    }
  ],
  PDFs: [
    {
      name: String,
      path: String
    }
  ]
});

module.exports = unitSchema;