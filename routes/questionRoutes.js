'use strict';

const express = require('express');
const router = express.Router();
const Question = require('../models/questionModels').Question;

//Parameter Handlers; qID
router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

//Parameter Handlers; aID
router.param('aID', (req, res, id) => {
  req.answer = req.question.answer.id(id);
  if (!req.answer) {
    err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }
  next();
});

//Read questions
router.get('/', (req, res, next) => {
  Question.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, questions) {
      if (err) return next(err);
      res.json(questions);
    });
});

//create questions
router.post('/', (req, res, next) => {
  let question = new Question(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

//Read specific question
router.get('/:qID', (req, res) => {
  res.json(req.question);
});

//create answer to specfic qn
router.post('/:qID/answers', (req, res) => {
  req.question.answers.push(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});
//Read answer to specfic qn
router.get('/:qID/answers', (req, res) => {
  // res.json({
  //   response: 'I have a GET request to read answers',
  //   questionId: req.params.qID,
  //   body: req.body,
  // });
});

//Edit specific answer
router.put('/:qID/answers/:aID', (req, res) => {
  req.answer.update(req.body, (err, result) => {
    res.json(result);
  });
});

//Delete answer to specfic qn
router.delete('/:qID/answers/:aID', (req, res) => {
  req.answer.remove((err) => {
    req.question.save((err, question) => {
      if (err) return next(err);
      res.json(question);
    });
  });
});

//Vote answer to specfic qn
router.post(
  '/:qID/answers/:aID/vote-:dirr',
  (req, res, next) => {
    if (req.params.dirr !== 'up' || req.params.dirr !== 'down') {
      req.vote = req.params.dir;
      next();
    } else {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  },
  (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
      if (err) return next(err);
      res.json(question);
    });
  }
);

//export router
module.exports = router;
