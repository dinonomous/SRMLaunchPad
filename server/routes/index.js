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

router.get("/api/getcollectionnames", getAllCollectionNames);

router.post(
  "/api/admin/subject/:collection",
  passport.authenticate("jwt", { session: false }),
  postCollectionTitles
);

router.post(
  "/api/admin/Quiz/:collection",
  passport.authenticate("jwt", { session: false }),
  postQuizCollectionTitles
);

router.delete(
  "/api/admin/subjects/collection/:collection",
  passport.authenticate("jwt", { session: false }),
  deleteCollection
);

router.get(
  "/api/subjects/:collection/:id",
  passport.authenticate("jwt", { session: false }),
  getUnitDetails
);

router.get(
  "/api/quizapi/:collection/:id",
  passport.authenticate("jwt", { session: false }),
  getQuizDetails
);

module.exports = router;
