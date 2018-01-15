/*jslint node: true */

'use strict';

module.exports = function(grunt) {
	require('grunt-config-dir')(grunt, {
		configDir: require('path').resolve('tasks')
	});

	grunt.registerTask('default', ['jshint', 'sass', 'nodemon', 'watch']);
};