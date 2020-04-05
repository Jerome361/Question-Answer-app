'use strict';

const express = require('express');
const chalk = require('chalk');
const jsonParser = require('body-parser').json

const app = express();

const port = process.env.PORT || 4000;

app.use(jsonParser());

// set http port
app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});
