const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const unitSchema = require("../models/units");
const quizSchema = require("../models/models");
const { getCollectionNames, getCollectionNamesQuiz } = require('../controllers/getCollection')

// Connect to MongoDB

const Subject=mongoose.createConnection(`mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/SRMLaunchpad2`, { autoCreate: false })

const QuizDB = mongoose.createConnection(`mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/Quizz`, { autoCreate: false }) // forcing mongoose not to create collections on its own

router.get("/getcollectionnames", getCollectionNames );

router.get("/:collection", async function (req, res) {
  try {
    const collectionName = req.params.collection;
    const Unitc = Subject.model(collectionName, unitSchema, collectionName); // model maping to sccess specific collections and quarry on that
    const Quizc = QuizDB.model(collectionName, quizSchema, collectionName); // model maping to sccess specific collections and quarry on that

    const documents = await Unitc.find({ title: { $exists: true } });

    // Extract titles from documents
    const titles = documents.map((doc) => doc.title);

    // Send the titles as the response
    res.json({ titles: titles });
  } catch (error) {
    console.error("Error getting collection titles:", error);
    res.status(500).json({ error: "Failed to retrieve collection titles" });
  }
});

router.get("/api/quizapi/Quizz/:collection", async function (req, res) {
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
});

router.get("/:collection/:unit", async function (req, res) {
  try {
    const collectionName = req.params.collection;
    const unitTitleToFind = req.params.unit;
    const Unitc = Subject.model(collectionName, unitSchema, collectionName);
    const foundUnit = await Unitc.findOne({ title: unitTitleToFind });

    if (!foundUnit) {
      res.status(404).send("Unit not found");
    } else {
      const Hedding = foundUnit.get("Headding");
      const pdf = foundUnit.get("PDF");
      console.log(Hedding);
      const topicsHTML = foundUnit.videos.map(
        (video) =>
          `<h3 class="video-title" data-url="${video.url}">${video.title}</h3>`
      );
      console.log(topicsHTML);
      console.log(foundUnit);
      res.send({ PDF: pdf, Heading: Hedding, topicsHTML });
    }
  } catch (error) {
    console.error("Error finding unit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/quizapi/getcollectionnames", getCollectionNamesQuiz);

router.get("/quizapi/:collection/:title", async function (req, res) {
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
