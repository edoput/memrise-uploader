'use strict';

module.exports = function (grunt) {
  [
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-mozilla-addon-sdk'
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
        'data/page-mod/*.js'
      ]
    },
    "mozilla-addon-sdk": {
      
    }
  });

  grunt.registerTask('default', ['jshint', 'watch']);
};

