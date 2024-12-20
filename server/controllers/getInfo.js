const { LearningModuleSchema } = require("../models/LearningModuleSchema");
const testSchema = require("../models/testSchema");
const { LearningModule, tests } = require("../config/db");
const {
  extractYouTubeVideoId,
  extractGoogleDriveFileId,
} = require("./VideoIdExtractor");

const getUnitDetails = async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const unitTitleToFind = req.params.id;
    const Unitc = LearningModule.model(
      collectionName,
      LearningModuleSchema,
      collectionName
    );
    const foundUnit = await Unitc.findById(unitTitleToFind);

    if (!foundUnit) {
      res.status(404).send("Unit not found");
    } else {
      const updatedVideos = foundUnit.videos.map((video) => ({
        _id: video._id,
        title: video.title,
        url: extractYouTubeVideoId(video.url),
      }));

      const updatedPDFs = foundUnit.PDF.map((pdf) => ({
        _id: pdf._id,
        name: pdf.name,
        path: extractGoogleDriveFileId(pdf.path),
      }));

      const response = {
        ...foundUnit.toObject(),
        videos: updatedVideos,
        PDF: updatedPDFs,
      };

      res.send(response);
    }
  } catch (error) {
    console.error("Error finding unit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuizDetails = async (req, res) => {
  try {
    const object = req.params.collection;
    const titleToFind = req.params.id;

    const Quizc = tests.model(object, testSchema, object);
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
