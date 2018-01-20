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
  const userObject = new userModel({
    username: req.body.username
  });
    userObject.save()
      .then(userDocument => {
        res.json(userDocument);
      }).catch(err => {
        res.json({error: err});
      });
};

exports.get_whole_exercise_log = (req, res) => {
  let totalCounts = 0;
  const filter = {userId: req.query.userId};
  console.log('userId', req.query.userId);
  exerciseModel.find(filter)
    .exec()
    .then(exercisesArray => {
      console.log(exercisesArray);
      exerciseModel.count(filter)
        .then(counts => {
          console.log('counts', counts);
          totalCounts = counts;
        });
      res.json(exercisesArray);
    });
};

// exports.get_specific_exercise_log = (req, res) => {
//     exerciseModel.find({userId: req.query.userId})
//     .then()
//     res.json(obj);
// };

exports.create_new_exercise = (req, res) => {
    const exerciseObject = new exerciseModel({
      userId: req.body.userId,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date || Date.now()
    });

    exerciseObject.save()
    .then(exerciseDocument => {
        const addedExerciseObj = exerciseObject;
        userModel.findById(req.body.userId)
            .then(userDocument => {
              addedExerciseObj.username = userDocument.username;
              res.json(addedExerciseObj);
            })
            .catch(err => {
              res.json({findById_err: err});
            });
    })
    .catch(err => {
      res.json({save_err: err});
    });


};
