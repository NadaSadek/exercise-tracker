'use strict';

module.exports = function sass(grunt) {
	grunt.loadNpmTasks('grunt-contrib-sass');
	return {
		sass: {
		    dist: {
		      	files: [{
			        expand: true,
			        cwd: 'stylesheets',
			        src: ['*.sass'],
			        dest: '../public',
			        ext: '.css'
	      		}]
		    }
		}
	}

};