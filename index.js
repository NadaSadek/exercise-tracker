/*jslint node: true */

'use strict';

const 	
	express = require('express'),
	path = require('path'),
	mongoose = require('mongoose'),
	config = require('./config'),
	app = express();

// Connect to Mongoose
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.error('Mongoose default connection open to ' + config.db));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));


app.on('error', err => console.error('app couldn\'t start', err));
app.listen(config.port, err => {
	if(err) console.error('app issue', err);
	else console.log('app is listening on port', config.port);
});