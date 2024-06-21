const mongoose = require("mongoose");

const Subject = mongoose.createConnection(
  `mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/SRMLaunchpad2`,
  { autoCreate: false }
);

const QuizDB = mongoose.createConnection(
  `mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/Quizz`,
  { autoCreate: false }
);

module.exports = {
  Subject: Subject,
  QuizDB: QuizDB,
};
