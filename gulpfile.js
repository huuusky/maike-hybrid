/**
 * Created by LiKun on 2016/8/8.
 */
"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sourceMaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Output Style
// Values: nested, expanded, compact, compressed
// Default: nested
gulp.task('sass', function () {
  gulp.src('xdtui-mobile/icons/xdtui-mobile.icons')
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./src/assets/stylesheets'));
    /*.pipe(cleanCSS())
   .pipe(rename({ extname: '.min.stylesheets' }))
   .pipe(gulp.dest('./dist/assets/stylesheets'));*/
});

gulp.task('build:html', function () {
  gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('build:js', function () {
  pump([
      gulp.src('src/scripts/*.js'),
      uglify(),
      gulp.dest('dist/scripts')
    ]
  )
});

gulp.task('build:css', function () {
  gulp.src('src/assets/stylesheets/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/assets/stylesheets'));
});

gulp.task('build', function () {
  gulp.start('build:html', 'build:js', 'build:css');
});

gulp.task('copy:jsLibs', function () {
  gulp.src('src/scripts/lib/*.min.js')
    .pipe(gulp.dest('dist/scripts/lib'));
});

gulp.task('copy:fonts', function () {
  gulp.src('src/assets/fonts/*.*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copy:images', function () {
  gulp.src('src/assets/images/**/*.*')
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('copy', function () {
  gulp.start('copy:jsLibs', 'copy:fonts', 'copy:images');
});

gulp.task('default', function () {
  gulp.start('build', 'copy');
});
