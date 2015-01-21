'use strict';

module.exports = function jshint(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');

	return {
		options : {
  	  'node'          : true,
  	  'browser'       : true,
		  'bitwise'       : true,
		  'camelcase'     : true,
		  'curly'         : true,
		  'eqeqeq'        : true,
		  'immed'         : true,
		  'indent'        : 2,
		  'latedef'       : 'nofunc',
		  'newcap'        : true,
		  'noarg'         : true,
		  'noempty'       : true,
		  'nonew'         : true,
		  'quotmark'      : 'single',
		  'undef'         : true,
		  'unused'        : true,
		  'strict'        : true,
		  'trailing'      : true,
		  'maxdepth'      : 3,
		  'maxstatements' : 20,
		  'maxcomplexity' : 20,
		  'boss'          : true,
		  'proto'         : false,
		  'laxcomma'      : true,
		  'expr'          : true,
		  'globals'       : {
			'beforeEach'  : true,
			'afterEach'   : true,
			'before'      : true,
			'after'       : true,
			'describe'    : true,
			'it'          : true
		  }
	    },
	    uses_defaults: [
            'lib/**/*.js',
            'test/*.js',
            'index.js',
            'Gruntfile.js'
        ]
	};
};
