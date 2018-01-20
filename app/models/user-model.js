/*jslint node: true */

'use strict';

const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
