module.exports = function (grunt) {
    grunt.initConfig({

        'angular-builder': {
            options: {
                mainModule: 'cmp',
                externalModules: ['ngLodash', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'angularUtils.directives.uiBreadcrumbs',
                    'ngTagsInput']
            },
            app: {
                src: ['static/app/*.js', 'static/app/**/*.js'],
                dest: 'static/build/project.js'
            }
        },
        uglify: {
            release: {
                files: {
                    'static/build/project.min.js': ['static/build/project.annotated.js']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            release: {
                files: [
                    {
                        expand: true,
                        src: ['static/build/project.js'],
                        ext: '.annotated.js',
                        extDot: 'last'
                    }
                ]
            }
        },
        "bower-install-simple": {
            "release": {
                options: {
                    production: true
                }
            },
            "debug": {
                options: {
                    production: false
                }
            }
        },
        clean: ["static/build/"]
    });

    grunt.loadNpmTasks('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-bower-install-simple");

    grunt.registerTask('release', ['clean', "bower-install-simple", 'angular-builder', 'ngAnnotate', 'uglify']);
    grunt.registerTask('debug', ['clean', 'angular-builder']);

};
