'use strict';

var gulp = require('gulp'),
    chalk = require('chalk'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

/************************* Variables ******************************/

var stylesSrc = 'src/**/*.css';
var stylesDest = 'dist';
var scriptSrc = 'src/**/*.js';
var scriptDest = 'dist';

/***************************** Styles *****************************/

gulp.task('styles', function () {
    return gulp.src(stylesSrc)
        .pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(stylesDest));
});

/***************************** Lint *******************************/

gulp.task('lint', function () {
    return gulp.src(scriptSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**************************** Scripts *****************************/

gulp.task('scripts', ['lint'], function () {
    return gulp.src(scriptSrc)
        .pipe(uglify())
        .on('error', function (err) {
            console.log(chalk.red("ERROR! ") + "file: " + chalk.red(err.filename) + " line: " + chalk.cyan(err.line));
        })
	.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(scriptDest));
});

/***************************** Build ******************************/

gulp.task('default', ['styles', 'scripts']);
