const mongoose = require('mongoose');
const { Subject, QuizDB, UnitDB } = require('../config/db');

mongoose.connect(UnitDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Create the user model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
