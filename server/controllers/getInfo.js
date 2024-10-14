const unitSchema = require("../models/units");
const quizSchema = require("../models/models");
const { Subject, QuizDB } = require("../config/db");

const getUnitDetails = async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const unitTitleToFind = req.params.id;
    const Unitc = Subject.model(collectionName, unitSchema, collectionName);
    const foundUnit = await Unitc.findById(`${unitTitleToFind}`);

    if (!foundUnit) {
      res.status(404).send("Unit not found");
    } else {
      res.send(foundUnit);
    }
  } catch (error) {
    console.error("Error finding unit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuizDetails = async (req, res) => {
  try {
    const subject = req.params.collection;
    const titleToFind = req.params.id;

    const Quizc = QuizDB.model(subject, quizSchema, subject);
    const foundQuiz = await Quizc.findById(`${titleToFind}`);

    if (!foundQuiz) {
      res.status(404).send("Quiz not found");
    } else {
      const unitTitle = foundQuiz.get("title");
      const questions = foundQuiz.get("questions");
      res.send({ unitTitle, questions });
    }
  } catch (error) {
    console.error("Error finding quiz:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
};

module.exports = {
  getUnitDetails,
  getQuizDetails,
};
