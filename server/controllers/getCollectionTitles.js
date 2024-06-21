const unitSchema = require("../models/units");
const quizSchema = require("../models/models");
const { Subject, QuizDB } = require('../config/db');

const getCollectionTitles = async (req, res) => {
    try {
      const collectionName = req.params.collection;
      const Unitc = Subject.model(collectionName, unitSchema, collectionName); // Assuming Subject and unitSchema are defined elsewhere
      const Quizc = QuizDB.model(collectionName, quizSchema, collectionName); // Assuming QuizDB and quizSchema are defined elsewhere
  
      const documents = await Unitc.find({ title: { $exists: true } });
  
      // Extract titles from documents
      const titles = documents.map((doc) => doc.title);
  
      // Send the titles as the response
      res.json({ titles: titles });
    } catch (error) {
      console.error("Error getting collection titles:", error);
      res.status(500).json({ error: "Failed to retrieve collection titles", errorMessage: error.message });
    }
  };

  const getQuizCollectionTitles = async (req, res) => {
    try {
      const collectionName = req.params.collection;
      const QuizModel = QuizDB.model(collectionName, quizSchema, collectionName);
      const documents = await QuizModel.find({ title: { $exists: true } });
  
      // Extract titles from documents
      const titles = documents.map((doc) => doc.title);
  
      // Send the titles as the response
      res.json({ titles: titles });
    } catch (error) {
      console.error("Error getting documents:", error);
      res.status(500).json({ error: "Failed to retrieve documents", errorMessage: error.message });
    }
  };
  
  module.exports = {
    getCollectionTitles,
    getQuizCollectionTitles
  };
  