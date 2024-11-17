const mongoose = require("mongoose");
require("dotenv").config();

/**
 * MongoDB Cluster Connection String from Environment Variables
 * @constant {string}
 */
const MONGODB_CLUSTER_CONNECTION_STRING = process.env.MONGODB_CLUSTER_CONNECTION_STRING;

if (!MONGODB_CLUSTER_CONNECTION_STRING) {
  console.error("Error: Missing MongoDB cluster connection string.");
  process.exit(1);
}

/**
 * MongoDB Connection Options
 * @constant {object}
 */
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Separate MongoDB Connections for Different Databases
 */
const LearningModule = mongoose.createConnection(
  `${MONGODB_CLUSTER_CONNECTION_STRING}/SRMLaunchpad2`,
  mongooseOptions
);

LearningModule.on("connected", () => console.log("✅ Connected to LearningModule database"));
LearningModule.on("error", (error) =>
  console.error("❌ Error in saperae database connection:", error)
);

/**
 * Additional Connections (if required)
 * Example for another database:
 */
const tests = mongoose.createConnection(
  `${MONGODB_CLUSTER_CONNECTION_STRING}/Quizz`,
  mongooseOptions
);

tests.on("connected", () => console.log("✅ Connected to tests database"));
tests.on("error", (error) =>
  console.error("❌ Error in saperae database connection:", error)
);

const user = mongoose.createConnection(
  `${MONGODB_CLUSTER_CONNECTION_STRING}/Users`,
  mongooseOptions
);

user.on("connected", () => console.log("✅ Connected to Users database"));
user.on("error", (error) =>
  console.error("❌ Error in saperae database connection:", error)
);

/**
 * Exports
 */
module.exports = {
  LearningModule,
  tests,
  user,
};
