var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('./config/passport');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiFrontUrl = process.env.FRONTEND_API_URL;

var indexRouter = require('./routes/index');
var authentication = require('./routes/authentication');
const passport = require('passport');

var app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// CORS setup
app.use(cors({
  origin: '*',
  credentials: true
}));

// Routes setup
app.use('/', indexRouter);
app.use('/authentication', authentication);

module.exports = app;