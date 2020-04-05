'use strict';

const express = require('express');
const router = express.Router();

// Read questions
router.get('/', (req, res) => {

  console.log('Can read questions');
});

// Create question
router.post('/', (req, res) => {
    console.log('Can Create question');
  });

  //Read answers
router.get('/:qID/answers', (req, res) => {
    console.log('Can Read answers');
  });
// Create answers
router.post('/:qID/answers', (req,res) => {
    console.log('Can Create answers');
  });

// Update answers
router.put('/:qID/answers/:aID', () => {
    console.log('Can Update answers');
  });

  // Delete answers
  router.delete('/:qID/answers/:aID', (req, res) => {
    console.log('Can Delete answers');
  });

  // Vote answers
  router.post('/:qID/answers/:aID/vote-:dir', (req, res) => {
    console.log('Can Vote answers');
  }); 


//export router
module.exports = router;
