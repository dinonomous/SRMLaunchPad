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

// Define your model associated with the specific collection
const Unit = mongoose.model('Unit', unitSchema); // 'myCollection' is the name of the specific collection

module.exports = Unit;