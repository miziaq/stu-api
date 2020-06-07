const path = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');

const database = require('./db/setup-db')
const router = require('./router');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.locals.db = database;
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
