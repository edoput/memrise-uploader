'use strict';

module.exports = function (grunt) {
  [
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-mozilla-addon-sdk',
    'grunt-execute'
  ].forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      all: {
        files: [
          'lib/main.js',
          'data/page-mod/*.js'
        ],
        tasks: ['jshint']
      },
      continuos: {
        files: [
          'lib/main.js',
          'data/page-mod/*.js'
        ],
        tasks: [
          'jshint',
          'mozilla-cfx-xpi',
          'execute'
        ]
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
    execute: {
        target: {
            src: ['publish.js']
        }
    },
    //Define a mozilla addon-sdk to download and use
    'mozilla-addon-sdk': {
      '1_16': {
        options: {
          revision: '1.16',
          dest_dir: 'build_tools/'
        }
      }
    },
    'mozilla-cfx-xpi': {
      'stable': {
        options: {
          'mozilla-addon-sdk': '1_16',
          extension_dir: '.',
          dist_dir: 'tmp/dist-stable',
          command: 'xpi',
          arguments: '--strip-sdk' // builds smaller xpis
        }
      }
    },
    'mozilla-cfx': {
      'run_stable': {
        options: {
          'mozilla-addon-sdk': '1_16',
          extension_dir: '.',
          command: 'run',
          arguments: '-p ~/.local/addon_profile/default'
        }
      },
      'run_nightly': {
        options: {
          'mozilla-addon-sdk': '1_16',
          extension_dir: '.',
          command: 'run',
          arguments: '-b /mnt/sdb1/firefox/firefox -p ~/.local/addon_profile/nightly'
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'watch:all']);
  grunt.registerTask('release', ['mozilla-cfx-xpi']);
  grunt.registerTask('pre-release', ['jshint', 'mozilla-cfx:run_stable']);
  grunt.registerTask('continuos', ['watch:continuos'])
};

