const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const replace = require('gulp-replace');
const zip = require('gulp-zip');

gulp.task('default', ['zip']);

gulp.task('sass', _ => {
	return gulp
			.src(['scss/app.scss'])
			.pipe(concat('style.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(replace(/;/g, ' !important;')) // because adding this in manually would be lame.
			.pipe(cssmin())
			.pipe(gulp.dest('css/'));
});

gulp.task('zip', ['sass'], _ => {
	return gulp
		.src(['./*','./**/*','!*.zip', '!*.md', '!versioner.js', '!./node_modules', , '!./node_modules/**'])
		.pipe(zip('package.zip'))
		.pipe(gulp.dest('./'));
});
