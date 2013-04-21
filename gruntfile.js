module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buster: {
            test: {},
            server: {
                port: 1111
            }
        },
        uglify: {
            options: {
                banner: '/** <%= pkg.title %> version:<%= pkg.version %> author:<%= pkg.author.name %> at:<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: './messenger.js',
            options: {
                curly: true,
                eqnull: true,
                eqeqeq: true,
                undef: true,
                validthis: true,
                browser: true,
                globals: {
                    global: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-buster');

    grunt.registerTask('test', ['jshint', 'buster']);
    grunt.registerTask('default', ['jshint', 'buster', 'uglify']);
};
