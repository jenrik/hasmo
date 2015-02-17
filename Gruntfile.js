module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');

	var bower = grunt.file.readJSON('bower.json');

	grunt.initConfig({
		hasmo: {
			version: bower.version,
			banner: grunt.file.read('banner.txt')
				.replace('%version%', bower.version)
				.split('%name%').join('Hasmo')
		},
		watch: {
			main: {
				files: ['src/**/*.scss', '!src/hasmo.css*'],
				tasks: ['devBuild']
			}
		},
		html2js: {
			options: {
				module: 'hasmo',
				quoteChar: '\'',
				indentString: '\t'
			},
			build: {
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
			build: {
				files: {
					'dist/hasmo.min.js': ['tmp/template.js', 'src/hasmo.js']
				}
			}
		},
		sass: {
			build: {
				options: {
					style: 'compressed',
					loadPath: 'src/sass/',
					banner: '<%= hasmo.banner %>'
				},
				files: {
					'dist/hasmo.min.css': 'src/hasmo.scss'
				}
			},
			devBuild: {
				options: {
					style: 'expanded',
					loadPath: 'src/sass/'
				},
				files: {
					'src/hasmo.css': 'src/hasmo.scss'
				}
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
			build: [
				'src/hasmo.js'
			]
		},
		clean: {
			dev: ['src/hasmo.css', 'src/hasmo.css.map'],
			build: ['dist/*']
		},
		connect: {
			dev: {
				options: {
					base: 'src/',
					livereload: true,
					open: true,
					useAvailablePort: true
				}
			}
		}
	});

	grunt.registerTask('build', ['clean', 'jshint', 'html2js', 'sass', 'uglify']);
	grunt.registerTask('devBuild', ['sass']);
	grunt.registerTask('default', ['devBuild', 'connect', 'watch']);
}
