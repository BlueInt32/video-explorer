module.exports = function (grunt)
{

	require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig({
	   express: {
			server: {
				options:
				{
					port: 9000,
					bases: 'public'
					}
				}
			}
	});

  grunt.loadNpmTasks('grunt-express');
	});


	grunt.registerTask('default', ['jshint', 'uglify:dist', 'copy', 'processhtml', 'replace']);
};