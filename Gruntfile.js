'use strict';

module.exports = function (grunt) {

    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    grunt.registerTask('dev',         [ 'mochacli:unit' ]);
    grunt.registerTask('test',        [ 'jshint', 'mochacli:unit' ]);
    grunt.registerTask('integration', [ 'jshint', 'mochacli:integration' ]);
    grunt.registerTask('coverage',    [ 'jshint', 'mocha_istanbul:coverage' ]);
    grunt.registerTask('lint',        [ 'jshint' ]);
};