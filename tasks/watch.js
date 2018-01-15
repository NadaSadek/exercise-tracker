'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  return {
      styles: {
          files: [
              'public/stylesheets/*.less',
              'app/*/**',
              'tasks/*.js',
              'views/**',
              '*.js'
          ],
          tasks: ['jshint','less']
      }
  };
};