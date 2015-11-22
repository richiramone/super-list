'use strict'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    cssmin: {
      dev: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          cwd: 'dev/media/css',
          src: ['style.*.css'],
          dest: 'prod/media/css/'
        }]
      }
    },
    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true
        },
        files: {
          'prod/index.html': 'dev/index.critical.html'
        }
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery', '$']
        }
      },
      dev: {
        files: {
          'prod/media/js/scripts.js': ['dev/media/js/scripts.js']
        }
      }
    }
  });

  grunt.registerTask('dev', ['TOO', 'phantomcss' /* csslint, jslint */]);

  grunt.registerTask('rc', [
    'less',
    'uncss',
    'critical',
    'cssmin',
    'htmlmin',
    'uglify',
    'imagemin',
    'phantomcss'
  ]);
};

/*
https://github.com/gruntjs/grunt-contrib-compass
https://github.com/gruntjs/grunt-contrib-watch
https://github.com/gruntjs/grunt-contrib-copy
http://www.browsersync.io/docs/grunt/
https://github.com/gruntjs/grunt-contrib-concat
*/
