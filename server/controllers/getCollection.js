const { Subject, QuizDB } = require("../config/db");

const getCollectionNames = async (req, res) => {
  try {
    const collections = await Subject.db.listCollections().toArray();

    // Extract collection names
    const collectionNames = collections.map((collection) => collection.name);
    res.send(collectionNames);
  } catch (error) {
    console.error("Error getting collection names:", error);
    res
      .status(500)
      .json({
        error: "Failed to retrieve collection names",
        errorMessage: error.message,
      });
  }
};

const getCollectionNamesQuiz = async (req, res) => {
  try {
    const collections = await QuizDB.db.listCollections().toArray();

    // Extract collection names
    const collectionNames = collections.map((collection) => collection.name);
    res.send(collectionNames);
  } catch (error) {
    console.error("Error getting collection names:", error);
    res
      .status(500)
      .json({
        error: "Failed to retrieve collection names",
        errorMessage: error.message,
      });
  }
};

module.exports = {
  getCollectionNames,
  getCollectionNamesQuiz,
};
