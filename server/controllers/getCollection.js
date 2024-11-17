const { LearningModule, tests, waitForConnections } = require("../config/db");
const { LearningModuleSchema } = require("../models/LearningModuleSchema");
const TestModel = require("../models/testSchema");

/**
 * Retrieves all collection names and their corresponding data from Subject and QuizDB.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a JSON response with the collected data.
 */
const getAllCollectionNames = async (req, res) => {
  try {
    // Ensure all database connections are ready
    await waitForConnections();

    // Fetch collection names from Subject and QuizDB
    const subjectCollectionName = await LearningModule.db.listCollections().toArray();
    const subjectCollectionNames = subjectCollectionName.map((collection) => collection.name);

    const quizCollectionName = await tests.db.listCollections().toArray();
    const quizCollectionNames = quizCollectionName.map((collection) => collection.name);

    // Fetch data for collections
    const fetchData = async (connection, collectionNames, schema) =>
      Promise.all(
        collectionNames.map(async (name) => {
          try {
            const Model = connection.model(name, schema, name);
            const documents = await Model.find({ title: { $exists: true } });
            return {
              [name]: documents.map((doc) => ({
                title: doc.title,
                id: doc._id,
              })),
            };
          } catch (error) {
            console.error(`Error fetching data from ${name}:`, error);
            return { [name]: [] }; // Return empty array on error
          }
        })
      );

    const [subjectData, quizData] = await Promise.all([
      fetchData(LearningModule, subjectCollectionNames, LearningModuleSchema),
      fetchData(tests, quizCollectionNames, TestModel),
    ]);

    // Transform data into arrays
    const transformToArray = (data) =>
      data.map((item) => {
        const [collectionName, collectionData] = Object.entries(item)[0];
        return { collectionName, data: collectionData };
      });

    const subjectsArray = transformToArray(subjectData);
    const quizzesArray = transformToArray(quizData);

    // Combine and send the response
    res.status(200).json({
      status: "success",
      message: "Collection names and data retrieved successfully.",
      data: {
        subjects: subjectsArray,
        quizzes: quizzesArray,
      },
    });
  } catch (error) {
    console.error("Error getting collection names:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve collection names and data.",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllCollectionNames,
};
