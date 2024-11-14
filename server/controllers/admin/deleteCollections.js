const LearningModule = require("../../models/LearningModuleSchema")
const testSchema = require("../../models/testSchema");
const { Subject, TrashDB } = require("../../config/db");

const deleteCollection = async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const UnitModel = Subject.model(collectionName, unitSchema, collectionName);
    const TrashUnitModel = TrashDB.model(collectionName, unitSchema);

    const collectionToBeDeleted = await UnitModel.find().lean();

    if (collectionToBeDeleted.length === 0) {
      return res.status(404).json({ message: "Collection not found or is already empty" });
    }

    await TrashUnitModel.create(collectionToBeDeleted);

    await UnitModel.collection.drop();

    res.status(200).json({ message: "Collection deleted and copied to TrashDB successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  deleteCollection,
};
