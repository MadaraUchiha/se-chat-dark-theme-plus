var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	return gulp.src(['src/polyfills/*', 'src/js/watcher.babel.js', 'src/js/parsers/*.babel.js'])
			.pipe(concat('script.js'))
			.pipe(babel())
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
});