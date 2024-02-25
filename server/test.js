const mongoose = require('mongoose');

// Define the schema
// Define the schema
const EEEdataSchema = new mongoose.Schema({
    title: String,
    videos: [{ title: String, url: String }],
    PDF: [{ name: String, path: String }],
  });  

// Create the model
const EEEdata = mongoose.model('EEEdata', EEEdataSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/SRMLaunchpad2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log MongoDB connection status
mongoose.connection.on('connected', async () => {
  console.log('MongoDB Connected!');

  // Access the "EEEdata" collection and print all documents
  try {
    const data = await EEEdata.find({}).exec();
    console.log('EEEdata Collection:', data);
  } catch (err) {
    console.error('Error accessing EEEdata collection:', err);
  } finally {
    // Uncomment the lin
