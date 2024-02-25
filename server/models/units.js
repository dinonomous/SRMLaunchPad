const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/SRMLaunchpad2');

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