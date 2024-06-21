const express = require("express");
const router = express.Router();
const { getCollectionNames, getCollectionNamesQuiz } = require('../controllers/getCollection')
const { getCollectionTitles, getQuizCollectionTitles } = require('../controllers/getCollectionTitles')
const { postCollectionTitles, postQuizCollectionTitles } = require('../controllers/admin/postCollection')
const { getUnitDetails, getQuizDetails } = require('../controllers/getInfo')

router.get("/getcollectionnames", getCollectionNames );

router.get("/api/quizapi/getcollectionnames", getCollectionNamesQuiz);

router.get("/:collection", getCollectionTitles);

router.get("/api/quizapi/Quizz/:collection", getQuizCollectionTitles);

router.post("/api/admin/subject/:collection", postCollectionTitles);

router.post("/api/admin/Quiz/:collection", postQuizCollectionTitles);

router.get("/:collection/:id", getUnitDetails);

router.get("/quizapi/:collection/:id", getQuizDetails);

module.exports = router;
