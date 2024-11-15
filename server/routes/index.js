const express = require("express");
const router = express.Router();
const { getAllCollectionNames } = require("../controllers/getCollection");
const {
  postCollectionTitles,
  postQuizCollectionTitles,
} = require("../controllers/admin/postCollection");
const { deleteCollection } = require("../controllers/admin/deleteCollections");
const { getUnitDetails, getQuizDetails } = require("../controllers/getInfo");
const passport = require("passport");
require("../config/passport");

router.get("/getcollectionnames", getAllCollectionNames);

router.post(
  "/admin/subject/:collection",
  passport.authenticate("jwt", { session: false }),
  postCollectionTitles
);

router.post(
  "/admin/Quiz/:collection",
  passport.authenticate("jwt", { session: false }),
  postQuizCollectionTitles
);

router.delete(
  "/admin/subjects/collection/:collection",
  passport.authenticate("jwt", { session: false }),
  deleteCollection
);

router.get(
  "/subjects/:collection/:id",
  passport.authenticate("jwt", { session: false }),
  getUnitDetails
);

router.get(
  "/quizapi/:collection/:id",
  passport.authenticate("jwt", { session: false }),
  getQuizDetails
);

module.exports = router;
