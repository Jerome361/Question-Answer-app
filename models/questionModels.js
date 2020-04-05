'use strict'

const mongoose = require('mongoose')
//Refrence the Schema constructor
let Schema = mongoose.Schema

// Answer schema (Child)
let AnswerSchema = new Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    vote: { type: Number, default: 0 },
  });
  
//Create question schema (Parent)
let QuestionSchema = new Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    answers: [AnswerSchema],
  });