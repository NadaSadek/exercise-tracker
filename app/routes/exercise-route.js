/*jslint node: true */

'use strict';

const
	express = require('express'),
	router = express.Router(),
	exerciseController = require('../controllers/exercise-controller');

router.get('/', exerciseController.open_homepage);
router.post('/api/exercise/new-user', exerciseController.create_new_user);
router.get('/api/exercise/users', exerciseController.get_all_users);
router.post('/api/exercise/add', exerciseController.create_new_exercise);
router.post('/api/exercise/:log', exerciseController.get_whole_exercise_log);
router.get('/api/exercise/:log', exerciseController.get_specific_exercise_log);

module.exports = router;
