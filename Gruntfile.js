module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			dev: {
				options: {
					cleancss: true
				},
				files: {
					"app/css/style.css": [
						"app/less/style.less"
					]
				}
			}
		},
		concat: {
			dev: {
				files: {
					"app/js/script.js": [
						"app/components/angular/angular.js",
						"app/components/angular-route/angular-route.js",
						"app/scripts/**/*.js"
					]
				}
			}
		},
		uglify: {
			dist: {
				options: {
					mangle: true,
					compress: {
						drop_console: true
					}
				},
				files: {
					"dist/js/script.js": [
						"app/js/script.js"
					]
				}
			}
		},
		copy: {
			dist: {
				files: [
					{ expand: true, cwd: "app/css/", src: ["style.css"], dest: "dist/css/" },
					{ expand: true, cwd: "app/", src: ["index.html"], dest: "dist/" },
					{ expand: true, cwd: "app/views/", src: ["**/*"], dest: "dist/views/" }
				]
			}
		},
		jshint: {
			qa: {
				options: {
					browser: true,
					camelcase: true,
					curly: true,
					eqeqeq: true,
					es3: true,
					forin: true,
					freeze: true,
					immed: true,
					indent: 4,
					latedef: true,
					maxlen: 120,
					newcap: true,
					noarg: true,
					noempty: true,
					nomen: true,
					nonbsp: false,
					nonew: true,
					plusplus: false,
					quotmark: true,
					undef: true,
					strict: true,
					trailing: true,
					unused: true,

					globals: {
						"$": true,
						angular: true,
						jQuery: true,
					},
				},
				files: {
					src: ["app/scripts/**/*.js"]
				}
			}
		},
		karma: {
			qa: {
				configFile: "karma.conf.js",
				singleRun: true
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-karma");

	// Custom tasks
	grunt.registerTask("default", []);

	grunt.registerTask("dev", [
		"less:dev",
		"concat:dev"
	]);
	grunt.registerTask("qa", [
		"jshint:qa",
		"karma:qa"
	]);
	grunt.registerTask("dist", [
		"dev",
		"uglify:dist",
		"copy:dist"
	]);
};
