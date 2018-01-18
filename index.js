/*jslint node: true */

'use strict';

const
	express = require('express'),
	app = express(),
	path = require('path'),
	mongoose = require('mongoose'),
	config = require('./config'),
	bodyParser = require('body-parser');


// Connect to Mongoose
mongoose.connect(config.db, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.error('Mongoose default connection open to ' + config.db));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require('./app/routes/exercise-route');
app.use(router);


app.on('error', err => console.error('app couldn\'t start', err));
app.listen(config.port, err => {
	if(err) console.error('app issue', err);
	else console.log('app is listening on port', config.port);
});
