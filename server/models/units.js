const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const unitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "please create a name",
  },
  videos: [
    {
      title: {
        type: String,
        required: true,
        default: "please create a title of video",
      },
      url: {
        type: String,
        required: true,
        default: "please create a url for the video",
      }
    }
  ],
  PDFs: [
    {
      name: {
        type: String,
        required: true,
        default: "please create a name for the PDF",
      },
      path: {
        type: String,
        required: true,
        default: "Where is the PDF ?",
      },
    }
  ]
});

module.exports = unitSchema;