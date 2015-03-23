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
                dest: 'static/build/js/app.js'
            }
        },
        uglify: {
            app: {
                files: {
                    'static/build/project.min.js': ['static/build/js/app.annotated.js']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: [
                    {
                        expand: true,
                        src: ['static/build/js/app.js'],
                        ext: '.annotated.js',
                        extDot: 'last'
                    }
                ]
            }
        },
        "bower-install-simple": {
            "app": {
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
        ngtemplates: {
            options: {
              module: "cmp"
            },
            app: {
                cwd: 'static/app',
                src: '**/*.html',
                dest: 'static/build/assets/app.templates.js'
            }
        },
        clean: ["static/build/js"]
    });

    grunt.loadNpmTasks('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('release', ['clean', "bower-install-simple", 'angular-builder', 'ngAnnotate', 'uglify']);
    grunt.registerTask('debug', ['clean', 'angular-builder']);
    grunt.registerTask('templates', ['ngtemplates']);

};
