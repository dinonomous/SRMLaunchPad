const express = require("express");
const router = express.Router();
const { getCollectionNames, getCollectionNamesQuiz } = require('../controllers/getCollection')
const { getCollectionTitles, getQuizCollectionTitles } = require('../controllers/getCollectionTitles')
const { postCollectionTitles, postQuizCollectionTitles } = require('../controllers/admin/postCollection')
const { getUnitDetails, getQuizDetails } = require('../controllers/getInfo');
const passport = require("passport");
require('../config/passport')

router.get("/api/subjects/getcollectionnames", passport.authenticate('jwt',{ session:false }), getCollectionNames );

router.get("/api/quizapi/getcollectionnames", passport.authenticate('jwt',{ session:false }),getCollectionNamesQuiz);

router.get("/api/subjects/collection/:collection", passport.authenticate('jwt',{ session:false }),getCollectionTitles);

router.get("/api/quizapi/Quizz/:collection", passport.authenticate('jwt',{ session:false }),getQuizCollectionTitles);

router.post("/api/admin/subject/:collection", passport.authenticate('jwt',{ session:false }),postCollectionTitles);

router.post("/api/admin/Quiz/:collection", passport.authenticate('jwt',{ session:false }),postQuizCollectionTitles);

router.get("/api/subjects/collection/:collection/:id", passport.authenticate('jwt',{ session:false }), getUnitDetails);

router.get("/quizapi/:collection/:id", passport.authenticate('jwt',{ session:false }),getQuizDetails);

module.exports = router;
