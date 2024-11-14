// Import and use connections
const initializeDatabaseConnections = require("./db");

(async () => {
  const { Subject, QuizDB } = await initializeDatabaseConnections();
  module.exports = { Subject, QuizDB };
})();
