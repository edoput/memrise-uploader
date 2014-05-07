'use strict';

module.exports = function (grunt) {
  [
    'grunt-contrib-jshint',
    'grunt-contrib-watch'
  ].forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      all: {
        files: [
          'lib/main.js',
          'data/page-mod/*.js'
        ],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'lib/main.js',
        'data/page-mode/*.js'
      ]
    },
  });

  grunt.registerTask('default', ['watch']);
};

