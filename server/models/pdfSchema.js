const mongoose = require('mongoose')

const PDFSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
      trim: true,
      default: "Please provide a name for the PDF.",
    },
    path: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      default: "Please provide a valid path for the PDF.",
    },
  },
  { _id: true }
);

module.exports = PDFSchema;
