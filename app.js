'use strict';

const express = require('express');
const chalk = require('chalk');
const jsonParser = require('body-parser').json;
const routes = require('./routes/questoRoutes');
const logger = require('morgan')

const app = express();

//set port dynamically
const port = process.env.PORT || 4000;

//register our middleware
app.use(logger('dev'))
app.use(jsonParser());

//route handler middleware
app.use('/question', routes);

//Catch routes whic do not trigger any handler
app.use((req, res, next)=>{
    let err = new Error('Not Found')
    err.status = 404;
    next(err)
});

//Error handler 
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({
        error: err.message
    })
    next()
})

// set http port
app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});
