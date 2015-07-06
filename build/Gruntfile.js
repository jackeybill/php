module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : 'src/<%= pkg.name %>.js',
				dest : 'build/<%= pkg.name %>.min.js'
			}
		},
		ngtemplates:  {
		  app:        {
			cwd:      'src',
			src:      '**/**.html',
			dest:     'build/templates.js',
			options:    {
			  htmlmin: {
				  collapseBooleanAttributes:      true,
				  collapseWhitespace:             true,
				  removeAttributeQuotes:          true,
				  removeComments:                 true, // Only if you don't use comment directives!
				  removeEmptyAttributes:          true,
				  removeRedundantAttributes:      true,
				  removeScriptTypeAttributes:     true,
				  removeStyleLinkTypeAttributes:  true
				}
			}
		  }
		}
	}); 
	// Load the plugin that provides the "uglify" task. 
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-angular-templates');
	// Default task(s). 
	grunt.registerTask('default', ['uglify','ngtemplates']); 
};