'use strict'

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var pkgJson = require('./package.json');
    var version = pkgJson.version;

    grunt.initConfig({
        compass: {
            dev: {
                options: {
                    outputStyle: 'expanded',
                    cssDir: 'dev/css',
                    sassDir: 'dev/scss'
                }
            },
            release: {
                options: {
                    outputStyle: 'compressed',
                    cssDir: 'releases/latest/css',
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
            release: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true
                },
                files: {
                    'releases/latest/index.php': 'releases/latest/index.php'
                }
            }
        },
        copy: {
            release: {
                cwd: 'dev/',
                src: ['**', '!**/scss/**'],
                dest: 'releases/superlist-' + version + '/',
                expand: true
            },
            latest: {
                cwd: 'releases/superlist-' + version + '/',
                src: '**',
                dest: 'releases/latest/',
                expand: true
            }
        },
        clean: 'releases/latest/**',
        uglify: {
            release: {
                files: {
                    'releases/latest/js/app.js': 'releases/latest/js/app.js'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'releases/latest/css/main.css': 'releases/latest/css/main.css'
                }
            }
        }
    });

    grunt.registerTask('latest', ['clean', 'copy:latest']);
    grunt.registerTask('release', ['compass', 'copy', 'htmlmin', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};
