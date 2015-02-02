module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	var bower = grunt.file.readJSON('bower.json');

	grunt.initConfig({
		hasmo: {
			version: bower.version,
			banner: grunt.file.read('banner.txt')
				.replace('%version%', bower.version)
				.replace('%name%', 'Hasmo')
		},
		watch: {
			dev: {
				files: ['src/**/*'],
				tasks: ['devBuild']
			}
		},
		html2js: {
			options: {
				module: 'hasmo',
				quoteChar: '\'',
				indentString: '\t'
			},
			main: {
				src: ['src/**/*.tpl.html'],
				dest: '.tmp/template.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= hasmo.banner %>',
				compress: true,
				report: 'gzip'
			},
			main: {
				files: {
					'dist/hasmo.min.js': ['tmp/template.js', 'src/hasmo.js']
				}
			}
		},
		sass: {
			main: {
				options: {
					style: 'compressed',
					loadPath: 'src/sass/',
					banner: '<%= hasmo.banner %>'
				},
				files: {
					'dist/hasmo.min.css': 'src/hasmo.scss'
				}
			},
			dev: {
				options: {
					style: 'expanded',
					loadPath: 'src/sass/'
				},
				files: {
					'test/hasmo.css': 'src/hasmo.scss'
				}
			}
		},
		copy: {
			devBuild: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: 'templates/**/*.tpl.html',
						dest: 'test/',
						filter: 'isFile'
					},
					{
						src: 'src/hasmo.js',
						dest: 'test/hasmo.js'
					}
				],
			},
			testDeps: {
				files: [
					{
						src: 'bower_components/angular/angular.min.js',
						dest: 'test/angular.min.js'
					}
				]
			}
		},
		jshint: {
			options: {
				'bitwise': true,
				'camelcase': true,
				'curly': false,
				'eqeqeq': false,
				'forin': false,
				'freeze': true,
				'funcscope': true,
				'indent': 2,
				'iterator': false,
				'latedef': false,
				'newcap': true,
				'noarg': true,
				'nocomma': false,
				'noempty': true,
				'nonbsp': true,
				'nonew': true,
				'notypeof': false,
				'quotmark': 'single',
				'shadow': 'inner',
				'undef': true,
				'unused': true,
				'browser': true,
				'globals': {
					'angular': true
				}
			},
			main: [
				'src/hasmo.js'
			]
		},
		clean: {
			main: [
				'test/*',
				'!test/index.html',
				'!test/test.js',
				'dist/*'
			]
		}
	});

	grunt.registerTask('build', ['jshint', 'html2js', 'sass', 'uglify']);
	grunt.registerTask('devBuild', ['sass:dev', 'copy:devBuild']);
	grunt.registerTask('default', ['copy:testDeps', 'devBuild', 'watch']);
}