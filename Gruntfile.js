'use strict'

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var pkgJson = require('./package.json');
    var version = pkgJson.version;

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed' //nested, expanded, compact, compressed
            },
            dist: {
                files: {
                    'dev/css/main.css': 'dev/sass/main.scss'
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
                    ghostMode: true,
                    notify: false
                }
            }
        },
        watch: {
            compass: {
                files: 'dev/sass/**/*.scss',
                tasks: 'sass'
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
                src: ['**', '!**/sass/**'],
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
        clean: 'releases/superlist-' + version + '/**',
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

    grunt.registerTask('latest', ['copy:latest']);
    grunt.registerTask('release', ['sass', 'clean', 'copy', 'htmlmin', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
};
