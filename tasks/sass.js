'use strict';

module.exports = function sass(grunt) {
	grunt.loadNpmTasks('grunt-contrib-sass');
	return {
		sass: {
		    dist: {
		      	files: [{
			        expand: true,
			        cwd: 'public/stylesheets/',
			        src: ['*.scss'],
			        dest: 'public/stylesheets/',
			        ext: '.css'
	      		}]
		    }
		}
	}

};
