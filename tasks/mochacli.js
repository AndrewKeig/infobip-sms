'use strict';

module.exports = function mochacli(grunt) {
	grunt.loadNpmTasks('grunt-mocha-cli');

	return {
        unit: ['test/unit/*.js'],
        integration: ['test/integration/*.js'],
        options: {
            timeout: 6000,
            'check-leaks': true,
            ui: 'bdd',
            reporter: 'spec'
        }
	};
};
