const express = require("express");
const router = express.Router();
const { getCollectionNames, getCollectionNamesQuiz } = require('../controllers/getCollection')
const { getCollectionTitles, getQuizCollectionTitles } = require('../controllers/getCollectionTitles')
const { getUnitDetails, getQuizDetails } = require('../controllers/getInfo')
const { Subject, QuizDB } = require('../config/db');

router.get("/getcollectionnames", getCollectionNames );

router.get("/:collection", getCollectionTitles);

router.get("/api/quizapi/Quizz/:collection", getQuizCollectionTitles);

router.get("/:collection/:unit", getUnitDetails);

router.get("/api/quizapi/getcollectionnames", getCollectionNamesQuiz);

router.get("/quizapi/:collection/:title", getQuizDetails);

module.exports = router;
