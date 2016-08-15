/**
 * Created by LiKun on 2016/8/8.
 */
"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var cssMinify = require('gulp-clean-css');
var sourceMaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Output Style
// Values: nested, expanded, compact, compressed
// Default: nested
gulp.task('sass', function () {
    gulp.src('./xdtui-mobile/icons/xdtui-mobile.icons')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./src/assets/stylesheets'));
        /*.pipe(cssMinify())
        .pipe(rename({ extname: '.min.stylesheets' }))
        .pipe(gulp.dest('./dist/assets/stylesheets'));*/
});

gulp.task('sass:watch', function () {
    gulp.watch('./ionic/icons/*.icons', ['sass']);
});

gulp.task('html', function () {
    // todo
});

gulp.task('html:watch', function () {
    gulp.watch('./src/modules/**/*.html', ['html']);
});
