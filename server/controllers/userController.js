const UserModel = require('../models/user');
const { hashSync } = require('bcrypt');

// User registration
exports.register = (req, res) => {
  const newUser = new UserModel({
    email: req.body.email,
    password: hashSync(req.body.password, 10),
  });

  newUser.save().then(user => {
    res.status(201).send({
      success: true,
      message: "User registered",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  }).catch(err => {
    res.status(500).send({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  });
};

// Check if email exists
exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    res.status(200).json({ exists: !!user });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Error checking email',
      error: err.message,
    });
  }
};
