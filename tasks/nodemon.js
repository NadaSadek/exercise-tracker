'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-nodemon');
  	return {
      	dev: {
          script: 'index.js'
      	}
 	};
};