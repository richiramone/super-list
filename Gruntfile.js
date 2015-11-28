'use strict'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compass: {
      dev: {
        options: {
          outputStyle: 'expanded',
          cssDir: 'dev/css',
          sassDir: 'dev/scss'
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ['dev/css/*.css', 'dev/index.php'],
        },
        options: {
          browser: "google chrome",
          proxy: "superlist.dev",
          watchTask: true,
          ghostMode: false
        }
      }
    },
    watch: {
      compass: {
        files: 'dev/scss/**/*.scss',
        tasks: ['compass']
      }
    }
  });

  grunt.registerTask('dev', ['browserSync', 'watch']);
};

/*
https://github.com/gruntjs/grunt-contrib-compass
https://github.com/gruntjs/grunt-contrib-watch
https://github.com/gruntjs/grunt-contrib-copy
http://www.browsersync.io/docs/grunt/
https://github.com/gruntjs/grunt-contrib-concat
*/
