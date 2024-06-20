const mongoose = require('mongoose');

const Subject=mongoose.createConnection(`mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/SRMLaunchpad2`, { autoCreate: false })

const QuizDB = mongoose.createConnection(`mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/Quizz`, { autoCreate: false }) // forcing mongoose not to create collections on its own

const getCollectionNames = async (req, res) => {
  try {
    const collections = await Subject.db.listCollections().toArray();

    // Extract collection names
    const collectionNames = collections
      .map(collection => collection.name)
    res.send(collectionNames);
  } catch (error) {
    console.error("Error getting collection names:", error);
    res.status(500).json({ error: "Failed to retrieve collection names", errorMessage: error.message });
  }
};
const getCollectionNamesQuiz = async (req, res) => {
  try {
    const collections = await QuizDB.db.listCollections().toArray();

    // Extract collection names
    const collectionNames = collections
      .map(collection => collection.name)
    res.send(collectionNames);
  } catch (error) {
    console.error("Error getting collection names:", error);
    res.status(500).json({ error: "Failed to retrieve collection names", errorMessage: error.message });
  }
};

module.exports = {
  getCollectionNames , getCollectionNamesQuiz
};
