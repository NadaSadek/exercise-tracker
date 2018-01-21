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
  .select('username _id')
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
        res.json({ username: userDocument.username, _id : userDocument._id });
      }).catch(err => {
        if(err.code === 11000) {
           res.status(500).json({error: 'username exists! Please choose another one!'});
        }
        res.status(500).json({error: err});
      });
};

exports.get_exercise_log = (req, res) => {
  let totalCounts = 0;
  console.log(req.query);
  const filter = {userId : req.query.userId};
  const query = exerciseModel.find(filter)
  if(req.body.limit) {
    query.limit(req.query.limit);
  }
  if(req.query.to) {
    query.where('date').lte(req.query.to);
  }
  if(req.query.from) {
    query.where('date').gte(req.query.from);
  }
  query.exec()
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

exports.create_new_exercise = (req, res) => {
    const exerciseObject = {
      userId: req.body.userId,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date || Date.now()
    };

    exerciseModel.create(exerciseObject)
    .then(exerciseDocument => {
        const addedExerciseObj = exerciseObject;
        console.log(addedExerciseObj);
        userModel.findById(req.body.userId)
            .exec()
            .then(userDocument => {
              console.log(userDocument);
              addedExerciseObj.username = userDocument.username;
              res.json(addedExerciseObj);
            })
            .catch(err => {
              res.status(500).json({'error': err});
            });
    })
    .catch(err => {
      res.status(500).json({'error': err});
    });


};
