const gulp = require('gulp');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const errorHandler = require('./gulp/utils/error-handler.js');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const babel = require('babelify');

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['script']);
  gulp.watch('src/**/*.scss', ['style']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp
  .task('script', () => browserify({
    entries: ['./src/app/app.js'],
    debug: true,
  })
  .transform(babel)
  .transform(stringify, {
    appliesTo: { includeExtensions: ['.html'] },
    minigy: true,
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  // .pipe(uglify())
  .pipe(gulp.dest('public/js')));

gulp.task('style', () => gulp
  .src('src/styles/main.scss')
    .pipe(sass().on('error', errorHandler))
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9'))
  .pipe(gulp.dest('public/css')));

gulp.task('dev', (cb) => {
  const callback = cb || function () {};

  runSequence([
    'script',
    'style',
    'images',
  ], 'watch', callback);
});

gulp.task('images', () => gulp
  .src('src/images/**/*')
  .pipe(changed('public/images')) // Ignore unchanged files
  .pipe(imagemin()) // Optimize
  .pipe(gulp.dest('public/images')));
