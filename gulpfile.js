var gulp = require('gulp'),
    useref = require('gulp-useref'),
    concatCSS = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    minifyJS = require('gulp-uglify'),
    notify = require('gulp-notify'),
    minifyHTML = require('gulp-minify-html'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev-append'),
    sftp = require('gulp-sftp'),
    uncss = require('gulp-uncss'),
    mainBowerFiles = require('main-bower-files');
    // server = require('gulp-server-livereload'),
    // autoprefixer = require('gulp-autoprefixer'),
    // plumber = require('gulp-plumber'),  //Plugin for checking ERRORS in files
    // useref = require('gulp-useref'),
    // gulpif = require('gulp-if')  //Filter files
    // wiredep = require('wiredep').stream;

// gulp.task('bower', function () {
//   gulp.src('./app/index.html')
//     .pipe(wiredep({
//       directory: "./app/bower_components"
//     }))
//     .pipe(gulp.dest('./app'));
// });

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

//uncss HTML
gulp.task('uncss', function(){
  return gulp.src('app/css/bundle.min.css')
    .pipe(uncss({ html: ['app/index.html'] }))
    .pipe(gulp.dest('app/css/'));
    // .pipe(server({
    //   livereload: true,
    //   directoryListing: true,
    //   open: true,
    //   defaultFile: 'index.html'
   
    // }));
});

//Hash after links 
gulp.task('rev', function() {
  gulp.src('app/index.html')
    .pipe(rev())
    .pipe(gulp.dest('dist/'));
});

//minify HTML
gulp.task('html', function () {
    var opts = {
    conditionals: true,
    spare:true,
    comments: false,
    empty: true,
    quotes: true
  };

  return gulp.src('app/index.html')
    .pipe(minifyHTML(opts))
    // .pipe(rename('index.html'))
    .on('error', console.error.bind(console))
    .pipe(notify('index.html is done!'))
    .pipe(gulp.dest('dist/'))
});

//Concate and minify CSS
gulp.task('css', function() {
  gulp.src('app/css/*.css')
    .pipe(concatCSS('main.min.css'))
    .on('error', console.error.bind(console))
    // .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(minifyCSS())
    // .pipe(rename('bundle.min.css'))
    
    .pipe(notify('main.min.css is done!'))
//-----------------------------------------------------------------------------
// .on('There is an ERROR somewhere.', console.error.bind(console))
// .on('error', console.error.bind(console))
//-----------------------------------------------------------------------------
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
  return gulp.src('app/js/*.js')
    .pipe(minifyJS())
    .on('error', console.error.bind(console))
    .pipe(notify('JS minified!'))
    .pipe(gulp.dest('dis/js'));
});

gulp.task('mainJS', function(){
     return gulp.src(mainBowerFiles('**/*.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('mainCSS', function(){
     return gulp.src(mainBowerFiles(), { base: 'app/bower_components/**/*.css' })
        .pipe(gulp.dest('dist/css'));
});

// gulp.task('useref', function () {
//     var assets = useref.assets();
    
//     return gulp.src('./*.html')
//         .pipe(assets)
//         .pipe(assets.restore())
//         .pipe(useref())
//         .pipe(gulp.dest('dist'));
// });
gulp.task('deploy', function () {
    return gulp.src('dist/**/*')
        .pipe(sftp({
            host: 'meliorem.ru',
            user: 'u429725278',
            port: 21,
            pass: 'meliorem37web'
            // remotePath: './public_html'
        }));
});

gulp.task('watch', function(){
    gulp.watch('app/css/*.css',['css'])
    gulp.watch('app/index.html', ['html'])
});

gulp.task('default', ['css', 'rev','html', 'js','watch']);
