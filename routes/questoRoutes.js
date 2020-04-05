'use strict';

const express = require('express');
const router = express.Router();

//Read questions
router.get('/', (req, res) => {
    res.json({ response: 'I have a GET request' });
  });
  
  //create questions
  router.post('/', (req, res) => {
    res.json({
      response: 'I have a POST request /Question',
      body: req.body.color
    });
  });
  
  //Read specific question
  router.get('/:qID', (req, res) => {
    res.json({
      response: 'I have a GET request',
      body: 'You sent me a specific get request',
      questionId: req.params.qID,
      questionId: req.params.qID
    });
  });
  
  //create answer to specfic qn
  router.post('/:qID/answers', (req, res) => {
    res.json({
      response: 'I have a POST request to answer a question',
      questionId: req.params.qID,
      body: req.body
    });
  });
  //Read answer to specfic qn
  router.get('/:qID/answers', (req, res) => {
    res.json({
      response: 'I have a GET request to read answers',
      questionId: req.params.qID,
      body: req.body
    });
  });
  
  //Edit specific answer
  router.put('/:qID/answers/:aID', (req, res) => {
    res.json({
      response: 'I have a PUT request to edit answer',
      questionId: req.params.qID,
      answerID: req.params.aID,
      body: req.body
    });
  });
  
  //Delete answer to specfic qn
  router.delete('/:qID/answers/:aID', (req, res) => {
    res.json({
      response: 'I have a DELETE request to delete answer',
      questionId: req.params.qID,
      answerID: req.params.aID
    });
  });
  
  //Vote answer to specfic qn
  router.post(
    '/:qID/answers/:aID/vote-:dirr',
    (req, res, next) => {
      // if (req.params.dirr.search('/^(up|down)$/') === -1) {
      if (req.params.dirr !== 'up' || req.params.dirr !== 'down') {
        next();
      } else {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
      }
    },
    (req, res) => {
      res.json({
        response: 'I have a POST request to vote answer',
        questionId: req.params.qID,
        answerID: req.params.aID,
        voteDirection: req.params.dirr,
        body: req.body
      });
    }
  );
  

//export router
module.exports = router;
