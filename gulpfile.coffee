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

buildScript = (files, watch, dist) ->
  buildFile = paths.buildFile
  if dist
    buildFile = "dist.js"

  rebundle = ->
    stream = bundler.bundle()
    stream.on("error", notify.onError(
      title: "Compile Error"
      message: "<%= error.message %>"
    ))
    .pipe(source(buildFile))
    .pipe gulp.dest(paths.build)
    .pipe(notify("success"))

  props = watchify.args
  props.entries = files
  if !dist
    props.debug = true

  bundler = (if watch then watchify(browserify(props)) else browserify(props))
  bundler.transform("babelify", {presets: ["es2015", "react"]})
  bundler.on "update", ->
    rebundle()
    gutil.log "Rebundled..."
    gutil.log paths.srcFiles
    return

  rebundle()


gulp.task "default", ->
  buildScript paths.srcFiles, false, false

gulp.task "watch", ["default"], ->
  buildScript paths.srcFiles, true, false

gulp.task 'dist', ->
  buildScript paths.srcFiles, false, true

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

