const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Unit = require('../models/units');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SRMLaunchpad2')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


router.get('/getcollectionnames', async function (req, res) {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    
    res.send(collectionNames);
  } catch (error) {
    console.error('Error getting collection names:', error);
    res.status(500).json({ error: 'Failed to retrieve collection names' });
  }
});

router.get('/:collection/:unit', async function (req, res) {
  try {
    const collectionName = req.params.collection;
    const unitTitleToFind = req.params.unit;

    // Dynamically select the model based on the collection name
    const UnitModel = mongoose.model('Unit', Unit.schema, collectionName); // Using Unit.schema

    const foundUnit = await UnitModel.findOne({ title: unitTitleToFind });

    if (!foundUnit) {
      res.status(404).send('Unit not found');
    } else {
      const Hedding = foundUnit.get("Headding");
      const pdf = foundUnit.get("PDF");
      console.log(Hedding)
      const topicsHTML = foundUnit.videos.map(video => `<h3 class="video-title" data-url="${video.url}">${video.title}</h3>`);
      console.log(topicsHTML);
      console.log(foundUnit);
      res.send({ PDF:pdf ,Heading: Hedding, topicsHTML });

    }
  } catch (error) {
    console.error('Error finding unit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:collection', async function (req, res) {
  try {
    const collectionName = req.params.collection;
    const UnitModel = mongoose.model('Unit', Unit.schema, collectionName); // Assuming each collection corresponds to a Mongoose model with the same name
    
    const documents = await UnitModel.find({ title: { $exists: true } });

    // Extract titles from documents
    const titles = documents.map(doc => doc.title);

    // Send the titles as the response
    res.json({ titles: titles });
  } catch (error) {
    console.error('Error getting collection titles:', error);
    res.status(500).json({ error: 'Failed to retrieve collection titles' });
  }
});


module.exports = router;
