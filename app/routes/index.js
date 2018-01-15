'use strict';
const
	express = require('express'),
	router = express.Router();

const ExerciseController = require('../controllers/exercise-controller');

router.post('/api/exercise/new-user', ExerciseController.create_new_user);
router.get('/api/exercise/users', ExerciseController.get_all_users);
router.post('/api/exercise/add', ExerciseController.create_new_exercise);
router.get('api/exercise/log', ExerciseController.get_whole_exercise_log);
router.get('api/exercise/log', ExerciseController.get_specific_exercise_log);

module.exports = router;