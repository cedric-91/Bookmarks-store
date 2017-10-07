var gulp = require('gulp'),
      scss = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      autoprefixer = require('gulp-autoprefixer'),
      rename = require('gulp-rename'),
      header = require('gulp-header'),
      cssnano = require('gulp-cssnano'),
      jshint = require('gulp-jshint'),
      package = require('./package.json');

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

// Compile SCSS to CSS file.
gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
   .pipe(scss({errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/assets/css/'))
    .pipe(cssnano())
    .pipe(rename({  suffix: '.min'  }))
    .pipe(header(banner, {  package : package }))
    .pipe(gulp.dest('app/assets/css'))
});

// Compress JS file
gulp.task('js', function() {
    return gulp.src('src/js/main.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, {  package : package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(rename({  suffix: '.min'  }))
    .pipe(gulp.dest('app/assets/js'))
});

// Run default functions and watch for any changes on scss, js files
gulp.task('default', ['scss', 'js'], function () {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/js/*.js', ['js']);
});
