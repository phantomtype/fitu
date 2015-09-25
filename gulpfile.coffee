gulp = require 'gulp'
bower = require 'main-bower-files'
concat = require 'gulp-concat'
filter = require 'gulp-filter'
babel = require 'gulp-babel'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
glob = require 'glob'

gulp.task 'build', ->
  files = glob.sync './frontend/javascripts/**/*.{js,jsx,coffee}'
  browserify
    entries: files,
    debug: true
  .transform 'babelify'
  .bundle()
  .pipe source 'bundle.js'
  .pipe gulp.dest 'public/'

gulp.task 'watch', ->
  gulp.watch('./frontend/javascripts/**/*.{js,jsx,coffee}', ['build'])

gulp.task 'default', ['build']

gulp.task 'dist', ->
  files = glob.sync './frontend/javascripts/**/*.{js,jsx,coffee}'
  browserify
    entries: files,
  .transform 'babelify'
  .bundle()
  .pipe source 'dist.js'
  .pipe gulp.dest 'public/'

gulp.task 'BowerJS', ->
  jsFilter = filter '**/*.js'
  gulp
    .src bower()
    .pipe jsFilter
    .pipe concat 'lib.js'
    .pipe gulp.dest 'public'