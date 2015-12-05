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
          src: ['dev/js/app.css', 'dev/css/*.css', 'dev/index.php'],
        },
        options: {
          browser: "google chrome",
          proxy: "superlist.dev",
          watchTask: true,
          ghostMode: false,
          notify: false
        }
      }
    },
    watch: {
      compass: {
        files: 'dev/scss/**/*.scss',
        tasks: 'compass'
      }
    }
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
};

/*
https://github.com/gruntjs/grunt-contrib-copy
https://github.com/gruntjs/grunt-contrib-concat
*/
