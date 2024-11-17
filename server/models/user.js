const mongoose = require('mongoose');
const { user } = require('../config/db');

// Get the database connection
const dbConnection = user;

if (!dbConnection) {
  console.error('Database connection is not established. Check your configuration.');
  process.exit(1);
}

// Import Schema directly from mongoose
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Enforce unique email addresses
    match: [/.+@.+\..+/, 'Invalid email format'], // Validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforce a minimum password length
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the User model using the existing connection
const UserModel = dbConnection.model('User', userSchema);

module.exports = UserModel;
