require('dotenv').config();

module.exports = {
  secretOrKey: process.env.JWT_SECRET,
};
