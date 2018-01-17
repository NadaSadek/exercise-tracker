/*jslint node: true */

'use strict';

const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const exerciseModel = mongoose.model('Exercise', exerciseSchema);

module.exports = exerciseModel;
