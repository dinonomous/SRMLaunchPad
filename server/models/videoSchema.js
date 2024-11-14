const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), 
  },
  title: {
    type: String,
    required: true,
    trim: true,
    default: "Please provide a title for the video."
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); 
      },
      message: props => `${props.value} is not a valid URL!`
    },
    default: "Please provide a valid URL for the video."
  }
}, { _id: true });

module.exports = videoSchema;
