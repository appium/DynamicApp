"use strict";

var gulp = require('gulp')
  , merge = require('merge-stream')
  , traceur = require('gulp-traceur');

gulp.task('default', function () {
  var traceurOpts = {
    experimental: true
  };
  var lib = gulp.src('lib/es7/**/*.js')
                .pipe(traceur(traceurOpts))
                .pipe(gulp.dest('lib/es5'));
  var test = gulp.src('test/es7/**/*.js')
                 .pipe(traceur(traceurOpts))
                 .pipe(gulp.dest('test/es5'));
  return merge(lib, test);
});

gulp.task('watch', function () {
  gulp.watch('lib/es7/**/*.js', ['default']);
});

