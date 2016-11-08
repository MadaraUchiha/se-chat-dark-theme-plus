const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const replace = require('gulp-replace');

gulp.task('default', _ => {
	return gulp
			.src(['scss/app.scss'])
			.pipe(concat('style.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(replace(/;/g, ' !important;')) // because adding this in manually would be lame.
			//.pipe(cssmin())
			.pipe(gulp.dest('css/'));
})