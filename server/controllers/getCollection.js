const { LearningModuleSchema } = require("../models/LearningModuleSchema");
const TestModel = require("../models/testSchema");
const { Subject, QuizDB } = require("../config/db");

/**
 * Fetches collection names from a given database.
 *
 * @param {Object} db - The database connection object.
 * @returns {Promise<string[]>} - An array of collection names.
 * @throws {Error} - If unable to retrieve collection names.
 */
const fetchCollectionNames = async (db) => {
  try {
    const collections = await db.listCollections().toArray();
    return collections.map((collection) => collection.name);
  } catch (error) {
    console.error("Error fetching collection names:", error);
    throw new Error("Failed to retrieve collection names from the database.");
  }
};

/**
 * Fetches titles from collections in the Subject database.
 *
 * @param {string[]} collectionNames - An array of collection names.
 * @returns {Promise<Object[]>} - An array of objects containing titles and ids.
 */
const fetchSubjectData = async (collectionNames) => {
  return Promise.all(
    collectionNames.map(async (collectionName) => {
      try {
        const UnitModel = Subject.model(
          collectionName,
          LearningModuleSchema,
          collectionName
        );
        const documents = await UnitModel.find({ title: { $exists: true } });
        return {
          [collectionName]: documents.map((doc) => ({
            title: doc.title,
            id: doc._id,
          })),
        };
      } catch (error) {
        console.error(`Error fetching data from ${collectionName}:`, error);
        return { [collectionName]: [] }; // Return an empty array on error
      }
    })
  );
};

/**
 * Fetches titles from collections in the QuizDB.
 *
 * @param {string[]} collectionNames - An array of collection names.
 * @returns {Promise<Object[]>} - An array of objects containing titles and ids.
 */
const fetchQuizData = async (collectionNames) => {
  return Promise.all(
    collectionNames.map(async (collectionName) => {
      try {
        const QuizModel = QuizDB.model(
          collectionName,
          TestModel,
          collectionName
        );
        const documents = await QuizModel.find({ title: { $exists: true } });
        return {
          [collectionName]: documents.map((doc) => ({
            title: doc.title,
            id: doc._id,
          })),
        };
      } catch (error) {
        console.error(`Error fetching data from ${collectionName}:`, error);
        return { [collectionName]: [] }; // Return an empty array on error
      }
    })
  );
};

/**
 * Retrieves all collection names and their corresponding data from Subject and QuizDB.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a JSON response with the collected data.
 */
const getAllCollectionNames = async (req, res) => {
  try {
    // Fetch collection names from both Subject and QuizDB
    const [subjectCollectionNames, quizCollectionNames] = await Promise.all([
      fetchCollectionNames(Subject.db),
      fetchCollectionNames(QuizDB.db),
    ]);

    // Fetch data for both Subject and QuizDB collections
    const [subjectData, quizData] = await Promise.all([
      fetchSubjectData(subjectCollectionNames),
      fetchQuizData(quizCollectionNames),
    ]);

    // Transform the data structure to arrays
    const transformToArray = (data) =>
      data.map((item) => {
        const [collectionName, collectionData] = Object.entries(item)[0];
        return { collectionName, data: collectionData };
      });

    const subjectsArray = transformToArray(subjectData);
    const quizzesArray = transformToArray(quizData);

    // Combine results into a structured response
    const result = {
      status: "success",
      message: "Collection names and data retrieved successfully.",
      data: {
        subjects: subjectsArray,
        quizzes: quizzesArray,
      },
    };

    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error getting collection names:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve collection names and data.",
      errorMessage: error.message,
    }); // Error response
  }
};

module.exports = {
  getAllCollectionNames,
};