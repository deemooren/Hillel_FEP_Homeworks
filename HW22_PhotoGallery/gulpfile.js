var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

function html() {
    return gulp.src('./src/index.html')
            .pipe(gulp.dest('./dist'));
}

function vendorsScripts() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js'
    ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./dist'));
}

function scripts() {
    return gulp.src('./src/**/*.js')
            .pipe(babel())
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./dist'));
}

function styles() {
    return gulp.src('./src/**/styles.scss')
            .pipe(sass())
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

const build = gulp.series(html, vendorsScripts, scripts, styles);

module.exports = {
    build: build,
    dev: gulp.series(build, watchFiles),
    serve: gulp.series(build, serve)
};