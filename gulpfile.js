var gulp = require('gulp'),
    notify = require('gulp-notify')
    

//Concate and minify CSS
gulp.task('css', function() {
  gulp.src('app/css/*.css')
    .pipe(concatCSS('main.min.css'))
    .on('error', console.error.bind(console))
    .pipe(minifyCSS())
    .pipe(notify('main.min.css is done!'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
  return gulp.src('app/js/*.js')
    .pipe(minifyJS())
    .on('error', console.error.bind(console))
    .pipe(notify('JS minified!'))
    .pipe(gulp.dest('dis/js'));
});



gulp.task('watch', function(){
    gulp.watch('app/css/*.css',['css'])
    gulp.watch('app/index.html', ['html'])
});

gulp.task('default', ['css','js','watch']);
