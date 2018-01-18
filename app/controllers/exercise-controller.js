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
};

exports.create_new_user = (req, res) => {
    userModel.save()
    .then(user => {
      res.json(user);
    });
};

exports.get_whole_exercise_log = (req, res) => {
    exerciseModel.save()
    .then( => {
      res.json(exercise);
    });
};

exports.get_specific_exercise_log = (req, res) => {
    const obj = {};
    res.json(obj);
};

exports.create_new_exercise = (req, res) => {
    const obj = {};
    res.json(obj);
};
