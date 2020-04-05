'use strict';

const express = require('express');
const chalk = require('chalk');
const jsonParser = require('body-parser').json;
const routes = require('./routes/questoRoutes');

const app = express();

//set port dynamically
const port = process.env.PORT || 4000;

//register our middleware
app.use(jsonParser());

app.use((req, res, next)=>{
    console.log('My first middleware')
    next()
})

app.use('/question', routes);

// set http port
app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});
