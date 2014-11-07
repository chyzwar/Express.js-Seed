module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: ['assets/less/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                },
            },
            scripts: {
                files: ['assets/javascripts/*.js'],
                tasks: ['concat'],
                options: {
                    interrupt: true
                }
            }

        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true
                },
                files: {
                    // target.css file: source.less file
                    "public/stylesheets/main.min.css": "assets/less/main.less"
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'public/**/*.css',
                        'public/**/*.jpg',
                        'public/**/*.png',
                        'public/**/*.gif',
                        'public/**/*.svg',
                        'public/**/*.js',
                        '**/*.php',
                        '**/*.html',
                        '**/*.jade'
                    ]
                },
                options: {
                    watchTask: true,
                    //I am hosting my projects using apache virtual hosts, I define ServerName and /etc/hosts
                    host: "localhost:3010",
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
            }
        },
        concat: {
            options: {
                separator: "\n", //add a new line after each file
                banner: "//Concatenated Javascript \n", //added before everything
                footer: "" //added after everything
            },
            dist: {
                // the files to concatenate
                src: [
                    'assets/javascripts/interaction.js'
                ],
                // the location of the resulting JS file
                dest: 'public/javascripts/interaction.min.js'
            }
        },
        removelogging: {
            dist: {
                src: 'public/javascripts/interaction.min.js',
                dest: 'public/javascripts/interaction.min.js'
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: 'closure-compiler',
                js: 'public/javascripts/interaction.min.js',
                jsOutputFile: 'public/javascripts/interaction.min.js',
                maxBuffer: 1500,
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    debug: true,
                },
            }
        },
        autoprefixer: {
            options: {
                // Task-specific options go here.
            },
            single_file: {
                options: {
                    // Target-specific options go here.
                },
                src: 'public/stylesheets/main.min.css',
                dest: 'public/stylesheets/main.min.css'
            },
        },
    });
    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // create custom task-list

    grunt.registerTask('build', ["autoprefixer", "removelogging", "closure-compiler"]);
    grunt.registerTask('default', ["browserSync", "watch", ]);


};
