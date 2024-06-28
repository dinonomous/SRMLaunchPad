const mongoose = require("mongoose");
require('dotenv').config();

const subjectConnectionString = process.env.MONGODB_SUBJECT_CONNECTION_STRING;
const quizDBConnectionString = process.env.MONGODB_QUIZDB_CONNECTION_STRING;

const Subject = mongoose.createConnection(subjectConnectionString, { autoCreate: false });
const QuizDB = mongoose.createConnection(quizDBConnectionString, { autoCreate: false });
const UnitDB = process.env.MONGODB_USERDB_CONNECTION_STRING;

module.exports = {
  Subject: Subject,
  QuizDB: QuizDB,
  UnitDB: UnitDB,
};

