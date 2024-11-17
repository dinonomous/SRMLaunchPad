const mongoose = require("mongoose");
require('dotenv').config();

const subjectConnectionString = process.env.MONGODB_SUBJECT_CONNECTION_STRING;
const quizDBConnectionString = process.env.MONGODB_QUIZDB_CONNECTION_STRING;
const trashDBConnectionString = process.env.MONGODB_TRASHDB_CONNECTION_STRING;

const LearningModule = mongoose.createConnection(subjectConnectionString, { autoCreate: false });
const tests = mongoose.createConnection(quizDBConnectionString, { autoCreate: false });
const TrashDB = mongoose.createConnection(trashDBConnectionString, { autoCreate: false });
const user = mongoose.createConnection(process.env.MONGODB_USERDB_CONNECTION_STRING, { autoCreate: false });

module.exports = {
  LearningModule,
  TrashDB,
  tests,
  user
};