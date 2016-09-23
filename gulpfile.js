var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-cssmin'),
	zip = require('gulp-zip'),
	replace = require('gulp-replace');

var dist = 'dist';

gulp.task('default', ['zip']);

gulp.task('scripts', function() {
	return gulp
			.src(['src/js/polyfills/*.js', 'src/js/utils/*.js', 'src/js/libs/*.js', 'src/js/plugins/*.js','src/js/watcher.js', 'src/js/parsers/*.js', 'src/js/app.js'])
			.pipe(concat('script.js'))
			.pipe(babel())
			.pipe(uglify())
			.pipe(gulp.dest(dist));
});

gulp.task('styles', ['scripts'], function() {
	return gulp
			.src(['src/css/app.scss', 'src/css/*.css'])
			.pipe(concat('style.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(replace(/;/g, ' !important;')) // because adding this in manually would be lame.
			.pipe(cssmin())
			.pipe(gulp.dest(dist));
});

gulp.task('static',['styles'], function() {
	return gulp
			.src(['src/static/*','src/static/**/*.*'])
			.pipe(gulp.dest(dist));
});

gulp.task('zip', ['static'], function() {
    return gulp.src([dist + '/*', dist + '/**/*.*', '!' + dist + '/*.zip'])
	        .pipe(zip('dist.zip'))
	        .pipe(gulp.dest(dist));
});