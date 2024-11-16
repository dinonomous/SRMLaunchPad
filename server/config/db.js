const mongoose = require("mongoose");
require("dotenv").config();

/**
 * MongoDB Cluster Connection String from Environment Variables
 * @constant {string}
 */
const MONGODB_CLUSTER_CONNECTION_STRING = process.env.MONGODB_CLUSTER_CONNECTION_STRING;

/**
 * Verifies if the MongoDB connection string is present.
 */
if (!MONGODB_CLUSTER_CONNECTION_STRING) {
  console.error("Error: Missing MongoDB cluster connection string in environment variables.");
  process.exit(1);
}

/**
 * MongoDB Connection Options
 * @constant {object}
 */
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

/**
 * MongoDB Cluster Connection
 * @type {mongoose.Connection}
 */
const clusterConnection = mongoose.createConnection(MONGODB_CLUSTER_CONNECTION_STRING, mongooseOptions);

clusterConnection.on("connected", () => console.log("✅ MongoDB cluster connected successfully"));
clusterConnection.on("error", (error) => {
  console.error("❌ MongoDB cluster connection error:", error.message);
  process.exit(1);
});

/**
 * Keeps the MongoDB connection alive by periodically pinging the server.
 */
const keepAlive = () => {
  setInterval(async () => {
    try {
      await clusterConnection.db.admin().ping();
      console.log("✅ MongoDB connection is active (Ping successful)");
    } catch (error) {
      console.error("❌ MongoDB ping failed:", error.message);
    }
  }, 30000);
};

keepAlive();

/**
 * Dynamically retrieves a database instance by name.
 * @param {string} dbName - The name of the database to retrieve.
 * @returns {mongoose.Connection} - The database instance.
 */
const getDatabase = (dbName) => {
  try {
    return clusterConnection.useDb(dbName);
  } catch (error) {
    console.error(`❌ Error accessing database "${dbName}":`, error.message);
    throw error;
  }
};

module.exports = {
  getDatabase,
};
