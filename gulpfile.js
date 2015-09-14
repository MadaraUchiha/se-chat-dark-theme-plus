var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	return gulp.start('compile js'/*,'styleshets'*/); // break compilation tasks up.
	// is it possible to consolidate the .pipe(gulp.dest('dist')) calls from here?
});

gulp.task('compile js', function() {
	return gulp.src(['src/js/polyfills/*.js', 'src/js/watcher.babel.js', 'src/js/parsers/*.babel.js'])
			.pipe(concat('script.js'))
			.pipe(babel())
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
});