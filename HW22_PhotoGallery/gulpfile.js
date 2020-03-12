var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var series = require('stream-series');

function html() {
    var sources = gulp.src(['./dist/styles.css', './dist/vendors.js', './dist/all.js'], {
        read: false
    });

    return gulp.src('./src/index.html')
                    .pipe(inject(series(sources), {  
                        addRootSlash: false,
                        ignorePath: 'dist',
                        addPrefix: '.',
                        removeTags: true
                     }))
                    .pipe(gulp.dest('./dist'));
}

function vendorsScripts() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/lightgallery/dist/js/lightgallery.min.js',
        './node_modules/lightgallery/modules/lg-thumbnail.min.js',
        './node_modules/lightgallery/modules/lg-fullscreen.min.js'
    ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./dist'));
}

function scripts() {
    return  gulp.src('./src/**/*.js')
                .pipe(sourcemaps.init())
                    .pipe(babel())
                    .pipe(concat('all.js'))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist'));
}

function vendorsStyles() {
    return gulp.src(['./node_modules/lightgallery/dist/css/lightgallery.css'])
                .pipe(concat('vendors.css'))
                .pipe(gulp.dest('./dist'));
}

function styles() {
    return gulp.src('./src/**/styles.scss')
                .pipe(sourcemaps.init())
                    .pipe(sass())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist'));
}

function watchFiles() {
    gulp.watch('./src/**/*.js', scripts);
    gulp.watch('./src/**/*.scss', styles);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('./src/**/*.js', gulp.series(scripts, browserSync.reload));
    gulp.watch('./src/**/*.scss', gulp.series(styles, browserSync.reload));
}

var build = gulp.series(html, vendorsScripts, scripts,vendorsStyles, styles);

module.exports = {
    build: build,
    dev: gulp.series(build, watchFiles),
    serve: gulp.series(build, serve)
};