var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
var passport = require('passport');
const passportAuth = require('./utils/passport')(passport);
const mongoose = require('mongoose');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var categoryRouter = require('./routes/category');
var contentRouter = require('./routes/content');

var app = express();

app.use(cors())
// session secret
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/content', contentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// connect to Mongodb 
mongoose.connect('mongodb://127.0.0.1:27017/knowledgebase', { useNewUrlParser: true, useUnifiedTopology: true })
  //mongoose.connect('mongodb://root:root@127.0.0.1:27017/happymeter-dev1?authSource=admin', { useMongoClient: true })
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database knowledgebase`);
  })
  .catch(() => {
    console.log(`Error Connecting to the Mongodb Database at URL knowledgebase`);
  });
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
