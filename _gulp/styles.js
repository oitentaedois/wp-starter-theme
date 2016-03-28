'use strict';

const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const header = require('gulp-header');

const indexSrc = './assets/styles/style.scss';
const filesSrc = [
  './assets/styles/**/*.scss',
  './theme/header.js'
];

module.exports = function (prodDir) {

  gulp.task('styles', function () {
    return gulp.src(indexSrc)
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(header(fs.readFileSync('./theme/header.js')))
      .pipe(gulp.dest(prodDir));
  });

  gulp.task('styles:watch', function () {
    return gulp.watch(filesSrc, ['styles']);
  });

  return ['styles', 'styles:watch'];

};
