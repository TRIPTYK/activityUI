var gulp = require('gulp');
var gls = require('gulp-live-server');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('default', function() {
  gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));

  gulp.watch(['app/sass/**/*.scss'], function(file) {
    console.log("sasswatch");
    gulp.src('app/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  });

  gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
  var server = gls.static('dist', 8888);
  server.start();
  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['app/**/*.html'], function(file) {
    gulp.src('app/*.html')
      .pipe(gulp.dest('dist'));
    server.notify.apply(server, [file]);
  });

  gulp.src('app/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
  gulp.watch(['app/images/*'], function(file) {
    gulp.src('app/images/*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/images'));
  });
});
