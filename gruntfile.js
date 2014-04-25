module.exports = function (grunt)
{

	require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig(
	{
	   shell: 
	   {
			dbhome: 
			{
				command: 'D:/Prog/Git/_Mongo/bin/mongod.exe --dbpath D:/Prog/Git/_Mongo/data/db',
				options: 
				{
                	stdout: true
            	}
            	
			},
			dbtaff: 
			{
				command: 'E:/Simon/Git/_Mongo/bin/mongod.exe --dbpath E:/Simon/Git/_Mongo/data/db',
				options: 
				{
                	stdout: true
            	}
            	
			}
    	},
    	express: 
    	{
			dev: 
			{
				options: 
				{
					script: './app.js'
				}
			}
		}
    });



	grunt.registerTask('default', ['express:dev', 'express-keepalive']);
	grunt.registerTask('dbhome', ['shell:dbhome']);
	grunt.registerTask('dbtaff', ['shell:dbtaff']);
};