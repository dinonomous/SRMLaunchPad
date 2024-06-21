const unitSchema = require("../models/units");
const quizSchema = require("../models/models");
const { Subject, QuizDB } = require('../config/db');

const getUnitDetails = async (req, res) => {
    try {
      const collectionName = req.params.collection;
      const unitTitleToFind = req.params.unit;
      const Unitc = Subject.model(collectionName, unitSchema, collectionName);
      const foundUnit = await Unitc.findOne({ title: unitTitleToFind });
  
      if (!foundUnit) {
        res.status(404).send("Unit not found");
      } else {
        const Heading = foundUnit.get("Heading");
        const pdf = foundUnit.get("PDF");
        console.log(Heading);
        const topicsHTML = foundUnit.videos.map(
          (video) =>
            `<h3 class="video-title" data-url="${video.url}">${video.title}</h3>`
        );
        console.log(topicsHTML);
        console.log(foundUnit);
        res.send({ PDF: pdf, Heading: Heading, topicsHTML });
      }
    } catch (error) {
      console.error("Error finding unit:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const getQuizDetails = async (req, res) => {
    try {
      const subject = req.params.collection;
      const titleToFind = req.params.title;
  
      const Quizc = QuizDB.model(subject, quizSchema, subject);
      const foundQuiz = await Quizc.findOne({ title: titleToFind });
  
      if (!foundQuiz) {
        res.status(404).send("Quiz not found");
      } else {
        const unitTitle = foundQuiz.get("title");
        const questions = foundQuiz.get("questions");
        res.send({ unitTitle, questions });
      }
    } catch (error) {
      console.error("Error finding quiz:", error);
      res.status(500).json({ error: "Internal Server Error", errorMessage: error.message });
    }
  };
  
  module.exports = {
    getUnitDetails,
    getQuizDetails
  };