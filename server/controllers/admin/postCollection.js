const LearningModule = require("../../models/LearningModuleSchema")
const testSchema = require("../../models/testSchema")
const { Subject, QuizDB } = require('../../config/db');

const postCollectionTitles = async (req, res) => {
    try {
        const collectionName = req.params.collection;
        const body = req.body;
        const Unitc = Subject.model(collectionName, unitSchema, collectionName);
    
        const createdSub = await Unitc.create(body);
    
        const documents = await Unitc.find({ title: { $exists: true } });
    
        // Respond with the created document and other documents with titles
        res.json({ created: createdSub, allDocuments: documents });
    } catch (error) {
      console.error("Error creating collection:", error);
      res.status(500).json({ error: "Failed to retrieve collection titles", errorMessage: error.message });
    }
  };

const postQuizCollectionTitles = async (req,res) => {
    try {
        const collectionName = req.params.collection;
        const body = req.body;
        const Quizc = QuizDB.model(collectionName, quizSchema, collectionName);

        const createdQuiz = await Quizc.create(body);
        const documents = await Quizc.find({ title: { $exists: true } });
    
        res.json({ created: createdQuiz, allDocuments: documents });
    } catch (error) {
        
    }
}


module.exports={
    postCollectionTitles,
    postQuizCollectionTitles
}