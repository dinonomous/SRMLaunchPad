const unitSchema = require("../models/units");
const quizSchema = require("../models/models");
const { Subject, QuizDB } = require("../config/db");

const getAllCollectionNames = async (req, res) => {
  try {
    // Fetch collections from both Subject and QuizDB
    const [subjectCollections, quizCollections] = await Promise.all([
      Subject.db.listCollections().toArray(),
      QuizDB.db.listCollections().toArray(),
    ]);

    const subjectCollectionNames = subjectCollections.map((collection) => collection.name);
    const quizCollectionNames = quizCollections.map((collection) => collection.name);

    // Fetch data for both Subject and QuizDB collections
    const [subjectData, quizData] = await Promise.all([
      Promise.all(
        subjectCollectionNames.map(async (collectionName) => {
          try {
            const Unitc = Subject.model(collectionName, unitSchema, collectionName);
            const documents = await Unitc.find({ title: { $exists: true } });
            const titles = documents.map((doc) => ({
              title: doc.title,
              id: doc._id,
            }));
            return { [collectionName]: titles };
          } catch (error) {
            console.error(`Error fetching data from ${collectionName}:`, error);
            return { [collectionName]: [] };
          }
        })
      ),
      Promise.all(
        quizCollectionNames.map(async (collectionName) => {
          try {
            const QuizModel = QuizDB.model(collectionName, quizSchema, collectionName);
            const documents = await QuizModel.find({ title: { $exists: true } });
            const titles = documents.map((doc) => ({
              title: doc.title,
              id: doc._id,
            }));
            return { [collectionName]: titles };
          } catch (error) {
            console.error(`Error fetching data from ${collectionName}:`, error);
            return { [collectionName]: [] };
          }
        })
      ),
    ]);

    // Combine results into an array with two objects
    const result = [
      { subject: subjectData.reduce((acc, curr) => ({ ...acc, ...curr }), {}) },
      { quiz: quizData.reduce((acc, curr) => ({ ...acc, ...curr }), {}) },
    ];

    res.json(result);
  } catch (error) {
    console.error("Error getting collection names:", error);
    res.status(500).json({
      error: "Failed to retrieve collection names",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllCollectionNames,
};
