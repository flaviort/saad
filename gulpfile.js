"use strict";

var gulp = require('gulp'),
sass = require('gulp-sass')(require('sass')),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create();

gulp.task('compileSass', function() {
	gulp.src(["assets/scss/main.scss"])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream());
});

gulp.task('watchFiles', function() {
	gulp.watch('assets/scss/**/*.scss', ['compileSass']);
})

gulp.task('serve', ['watchFiles'], function(){
	browserSync.init({
		proxy: "localhost/clients/saad/"
	});
	gulp.watch(["assets/scss/**/*.scss"]);
	gulp.watch(["**/*.php", "**/**/*.php", "assets/js/*.js"]).on('change', browserSync.reload);
});