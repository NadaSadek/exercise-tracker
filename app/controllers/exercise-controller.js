/*jslint node: true */

'use strict';

const
    express = require('express'),
    exerciseModel = require('../models/exercise-model'),
    userModel = require('../models/user-model'),
    mongoose = require('mongoose');
    mongoose.Promise = Promise;

exports.open_homepage = (req, res) => res.render('index');

exports.get_all_users = (req, res) => {
  userModel.find({})
    .exec()
    .then(users => {
    res.json(users);
  });

  exports.get_whole_exercise_log = (req, res) => {
    res.json(req.params.id);
  };

  exports.create_new_exercise = (req, res) => {
    res.json(req.params.id);
  };
};
