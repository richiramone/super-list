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
      },
      rc: {
        options: {
          outputStyle: 'compressed',
          cssDir: 'rc/css',
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
    },
    htmlmin: {
      rc: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true
        },
        files: {
          'rc/index.php': 'rc/index.php'
        }
      }
    },
    copy: {
      main: {
        cwd: 'dev/',
        src: '**',
        dest: 'rc/',
        expand: true
      }
    },
    uglify: {
      rc: {
        files: {
          'rc/js/app.js': 'rc/js/app.js'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'rc/css/main.css': 'rc/css/main.css'
        }
      }
    }
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('rc', ['compass', 'copy', 'htmlmin', 'uglify', 'cssmin']);
};
