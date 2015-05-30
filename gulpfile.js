'use strict';

var gulp = require('gulp'),
    livereload = require('gulp-livereload');
gulp.task('watch', function() {
	console.log("should update")
  livereload.listen({start:true});
  gulp.watch(['views/*.ejs','public/css/*.css', 'public/js/*.js'],['reload']);
});


gulp.task('reload', function() {
  gulp.src(['views/*.ejs','public/css/*.css', 'public/js/*.js'])
    .pipe(livereload());
});
