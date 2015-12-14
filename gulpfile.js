var gulp    = require('gulp');
var bower   = require('bower');
var sh      = require('shelljs');

var $ = require('gulp-load-plugins')();

var paths = {
  sass: ['./scss/**/*.scss'],
  jsFiles: ['./www/js/**/*.js']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe($.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('inject', function () {
  return gulp.src('./www/index.html')
    .pipe(
      $.inject( // ./www/**/*.js files
        gulp.src(paths.jsFiles)
          .pipe($.plumber()) // use plumber so watch can start despite js errors
          .pipe($.naturalSort())
          .pipe($.angularFilesort()),
        {relative: true}))
    .pipe(gulp.dest('./www'));

});