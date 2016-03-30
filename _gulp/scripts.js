'use strict';

const gulp = require('gulp');
const gulpUtil = require('gulp-util');
const path = require('path');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const lint = require('gulp-eslint');

const src = './assets/scripts/**/*.js';

module.exports = function (prodDir) {

  gulp.task('scripts:clean', function () {
    return gulp.src(path.join(prodDir, 'assets', 'scripts', '**', '*.js'))
      .pipe(clean({ read: false, force: true }));
  });

  gulp.task('scripts', ['scripts:clean'], function () {
    return gulp.src(src)
      .pipe(lint())
      .pipe(lint.format())
      .pipe(lint.failAfterError())
      .pipe(uglify().on('error', gulpUtil.log))
      .pipe(gulp.dest(path.join(prodDir, 'assets', 'scripts')));
  });

  gulp.task('scripts:watch', ['scripts'], function () {
    return gulp.watch(src, ['scripts']);
  });

  return ['scripts:watch'];
  
};
