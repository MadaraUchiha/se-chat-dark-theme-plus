var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat');
	
// because I don't know browserfy.. 
var polyfill = 'node_modules/gulp-babel/node_modules/babel-core/browser-polyfill.min.js';

gulp.task('es6to5', function() {
	return gulp.src([polyfill, 'src/js/watcher.babel.js', 'src/js/parsers/*.babel.js'])
			.pipe(concat('script.js'))
			.pipe(babel())
			.pipe(gulp.dest('dist'));
});