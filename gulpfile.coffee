gulp = require 'gulp'
bower = require 'main-bower-files'
concat = require 'gulp-concat'
filter = require 'gulp-filter'
babel = require 'gulp-babel'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
glob = require 'glob'
rename = require 'gulp-rename'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'
gutil = require 'gulp-util'
watchify = require 'watchify'

paths =
  srcFiles: glob.sync('./frontend/javascripts/**/*.{js,jsx,coffee}')
  build: './public/'
  buildFile: 'bundle.js'

buildScript = (files, watch) ->
  rebundle = ->
    stream = bundler.bundle()
    stream.on("error", notify.onError(
      title: "Compile Error"
      message: "<%= error.message %>"
    ))
    .pipe(source(paths.buildFile))
    .pipe gulp.dest(paths.build)
    .pipe(notify("success"))

  props = watchify.args
  props.entries = files
  props.debug = true

  bundler = (if watch then watchify(browserify(props)) else browserify(props))
  bundler.transform 'babelify'
  bundler.on "update", ->
    rebundle()
    gutil.log "Rebundled..."
    gutil.log paths.srcFiles
    return

  rebundle()


gulp.task "default", ->
  buildScript paths.srcFiles, false

gulp.task "watch", ["default"], ->
  buildScript paths.srcFiles, true

gulp.task 'dist', ->
  files = glob.sync './frontend/javascripts/**/*.{js,jsx,coffee}'
  browserify
    entries: files,
  .transform 'babelify'
  .bundle()
  .pipe source 'dist.js'
  .pipe gulp.dest 'public/'

gulp.task 'bower', ->
  jsFilter = filter '**/*.js'
  gulp
    .src bower()
    .pipe jsFilter
    .pipe concat 'lib.js'
    .pipe gulp.dest 'public'

gulp.task 'bowerc', ->
  cssFilter = filter '**/*.css'
#  scssFilter = filter '**/*.scss'
#  sassFilter = filter '**/*.sass'
  gulp
    .src bower()
    .pipe cssFilter
#    .pipe rename
#      prefix: '_'
#      extname: '.scss'
    .pipe gulp.dest 'public/'
#    .pipe cssFilter.restore()
#    .pipe scssFilter
#    .pipe gulp.dest 'public/'
#    .pipe cssFilter.restore()
#    .pipe sassFilter
#    .pipe gulp.dest 'public/'
#    .pipe cssFilter.restore()

