var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
// var useref = require('gulp-useref');

gulp.task('lint', function() {
  return gulp.src(['scripts/script.js', 'scripts/pagination.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
  return gulp.src('scripts/*.js')
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
    gulp.src('style/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/'));
});



/*gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('index.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['lint', 'html']);*/