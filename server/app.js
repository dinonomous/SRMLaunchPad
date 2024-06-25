var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var authentication = require('./routes/authentication');
const passport = require('passport');

var app = express();

require('./config/passport')

app.use(cors({
    origin: 'http://192.168.0.135:5173',
    credentials: true
  }));
  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/authentication', authentication);


module.exports = app;
