"use strict";

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    merge = require('merge-stream'),
    traceur = require('gulp-traceur'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    Promise = require('bluebird'),
    runSequence = Promise.promisify(require('run-sequence')),
    clear = require('clear'),
    sourcemaps = require('gulp-sourcemaps');

var exitOnError = false;

function handleError(err) {
  var displayErr = gutil.colors.red(err);
  gutil.log(displayErr);
  if (exitOnError) process.exit(1);
}

gulp.task('transpile', function () {
  var traceurOpts = {
    experimental: true,
    asyncFunctions: true,
    outputExt: 'js',
    sourceMaps: 'inline'
  };
  var lib = gulp.src('lib/**/*.es7')
    .pipe(traceur(traceurOpts))
    .on('error', handleError)
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest('build/lib'));
  var test = gulp
    .src('test/**/*.es7')
    .pipe(rename({extname: '.js'}))
    .pipe(traceur(traceurOpts))
    .on('error', handleError)
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest('build/test'));
  return merge(lib, test);
});

gulp.task('test', ['transpile'], function () {
  return gulp
    .src('build/test/**-specs.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .on('error', handleError);
});

gulp.task('kill-gulp', function() {
  process.exit(0);
});

gulp.task('clear-terminal', function() {
  clear();
  return Promise.delay(100);
})

// gulp error handling is not very well geared toward watch
// so we have to do that to be safe.
// that should not be needed in gulp 4.0
gulp.task('watch-build', function() {
  return runSequence('clear-terminal', ['transpile', 'test']);
});
gulp.task('watch', function () {
  exitOnError = true;
  gulp.watch(['lib/**/*.es7', 'test/**/*.es7'], ['watch-build']);
  gulp.watch('gulpfile.js', ['clear-terminal','kill-gulp']);
});
gulp.task('spawn-watch', ['clear-terminal'], function() {
 var spawnWatch = function() {
    var proc = require('child_process').spawn('gulp', ['watch'], {stdio: 'inherit'});
    proc.on('close', function (code) {
      spawnWatch()
    });
  }
  spawnWatch();
})

// default target is watch
gulp.task('default', ['spawn-watch']);

