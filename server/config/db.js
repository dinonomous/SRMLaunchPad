const mongoose = require("mongoose");
require("dotenv").config();

const subjectConnectionString = process.env.MONGODB_SUBJECT_CONNECTION_STRING;
const quizDBConnectionString = process.env.MONGODB_QUIZDB_CONNECTION_STRING;
const trashDBConnectionString = process.env.MONGODB_TRASHDB_CONNECTION_STRING;
const userDBConnectionString = process.env.MONGODB_USERDB_CONNECTION_STRING;

// Helper function to create and monitor a connection
const createConnection = (uri, name) => {
  const connection = mongoose.createConnection(uri, { autoCreate: false });

  connection.on("connected", () => {
    console.log(`MongoDB connected: ${name}`);
  });

  connection.on("error", (err) => {
    console.error(`MongoDB connection error (${name}):`, err);
  });

  connection.on("disconnected", () => {
    console.warn(`MongoDB disconnected: ${name}`);
  });

  return connection;
};

// Create connections
const LearningModule = createConnection(subjectConnectionString, "LearningModuleDB");
const tests = createConnection(quizDBConnectionString, "QuizDB");
const TrashDB = createConnection(trashDBConnectionString, "TrashDB");
const user = createConnection(userDBConnectionString, "UserDB");

// Utility function to ensure all connections are ready
const waitForConnections = async () => {
  const connections = [LearningModule, tests, TrashDB, user];

  for (const connection of connections) {
    if (connection.readyState !== 1) {
      await new Promise((resolve, reject) => {
        connection.once("connected", resolve);
        connection.once("error", reject);
      });
    }
  }

  console.log("All MongoDB connections are ready.");
};

module.exports = {
  LearningModule,
  TrashDB,
  tests,
  user,
  waitForConnections, // Export readiness check
};
