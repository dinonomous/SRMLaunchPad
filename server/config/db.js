const mongoose = require("mongoose");
require("dotenv").config();

const {
  MONGODB_SUBJECT_CONNECTION_STRING,
  MONGODB_QUIZDB_CONNECTION_STRING,
  MONGODB_TRASHDB_CONNECTION_STRING,
  MONGODB_USERDB_CONNECTION_STRING,
} = process.env;

// Verify that all required environment variables are set
if (
  !MONGODB_SUBJECT_CONNECTION_STRING ||
  !MONGODB_QUIZDB_CONNECTION_STRING ||
  !MONGODB_TRASHDB_CONNECTION_STRING ||
  !MONGODB_USERDB_CONNECTION_STRING
) {
  console.error("Error: Missing one or more MongoDB connection strings in environment variables.");
  process.exit(1);
}

// Recommended Mongoose connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to create a connection with error handling
const createConnection = (connectionString, dbName) => {
  const connection = mongoose.createConnection(connectionString, mongooseOptions);
  connection.on("connected", () => console.log(`Successfully connected to ${dbName}`));
  connection.on("error", (error) => {
    console.error(`Error connecting to ${dbName}:`, error.message);
    process.exit(1);
  });
  return connection;
};

// Directly initialize connections and export them
const Subject = createConnection(MONGODB_SUBJECT_CONNECTION_STRING, "SRMLaunchpad2");
const QuizDB = createConnection(MONGODB_QUIZDB_CONNECTION_STRING, "Quizz");
const TrashDB = createConnection(MONGODB_TRASHDB_CONNECTION_STRING, "TrashDB");
const UnitDB = MONGODB_USERDB_CONNECTION_STRING; // Exported as URI for direct use if required

module.exports = {
  Subject,
  QuizDB,
  TrashDB,
  UnitDB,
};
