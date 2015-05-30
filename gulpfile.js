'use strict';

var gulp = require('gulp'),
    livereload = require('gulp-livereload');
gulp.task('watch', function() {
	console.log("should update")
  livereload.listen({start:true});
  gulp.watch(['views/*.ejs','public/css/*.css'],['reload']);
});


gulp.task('reload', function() {
  gulp.src(['views/*.ejs','public/css/*.css'])
    .pipe(livereload());
});