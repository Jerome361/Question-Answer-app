'use strict';

const express = require('express');
const chalk = require('chalk');
const jsonParser = require('body-parser').json;
const routes = require('./routes/questionRoutes');
const logger = require('morgan');
const mongoose = require('mongoose');
const models = require('./models/questionModels');

const app = express();

//set port dynamically
const port = process.env.PORT || 4000;

//register our middleware
app.use(logger('dev'));
app.use(jsonParser());

//Database connection
mongoose.connect('mongodb://localhost:27017/QnAnswer');

//Monitor the status of the connection
const db = mongoose.connection;

// Catch error event on connection
db.on('error', (err) => {
  console.error('connection error', err);
});

// Open connection event
db.once('open', () => {
  console.log('db connection successful');
});

//Set CORS- Cross Oorigin Resource Sharing
appp.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method === "OPTIONS"){
    res.header("Access-Control_allow-Methods", "PUT, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

//route handler middleware
app.use('/question', routes);

//Catch routes whic do not trigger any handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
  next();
});

// set http port
app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});
