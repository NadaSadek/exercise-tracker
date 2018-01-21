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
    res.status(500).json(err);
  });
};

exports.get_exercise_log = (req, res) => {
  let totalCounts = 0;

  const filter = {userId : req.query.userId};
  const query = exerciseModel.find(filter).select('description duration date')

  if(req.query.to) {
    query.where('date').lte(req.query.to);
  }
  if(req.query.from) {
    query.where('date').gte(req.query.from);
  }
  if(req.query.limit) {
    query.limit(parseInt(req.query.limit));
  }

  query.exec()
  .then(exercisesArray => {
    exerciseModel.count(filter)
    .then(counts => {
      totalCounts = counts;
      userModel.findById(req.query.userId)
      .select('username _id')
      .then(userDocument => {
        const logInfo = {
          username: userDocument.username,
          userId: userDocument._id,
          counts: totalCounts,
          logs: exercisesArray
        };
        res.json(logInfo);
      })
      .catch(err => {
        res.json(err);
      })
    });
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
    userModel.findById({_id: req.body.userId})
    .then(userDocument => {
      addedExerciseObj.username = userDocument.username;
      res.json(addedExerciseObj);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  })
  .catch(err => {
    res.status(500).json(err);
  });

};
