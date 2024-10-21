var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('./config/passport');
require('dotenv').config();
const cron = require('node-cron');
const { autoUpdateCache } = require('./controllers/driveController');

cron.schedule('0 * * * *', () => {
    console.log('Running scheduled cache update');
    autoUpdateCache();
});

const apiUrl = process.env.API_URL;
const apiFrontUrl = process.env.FRONTEND_API_URL;

var indexRouter = require('./routes/index');
var authentication = require('./routes/authentication');
var googleRouter = require("./routes/googleRouter")
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
  origin: ['https://srmlaunchpad.vercel.app','http://localhost:3000'],
  credentials: true
}));

// Routes setup
app.use('/api/v2/', indexRouter);
app.use('/api/v2/authentication', authentication);
app.use('/api/v2/google/', googleRouter)

module.exports = app;