'use strict';

var gulp            = require('gulp');
var run             = require('run-sequence');
var sourcemaps      = require('gulp-sourcemaps');
var babel           = require('gulp-babel');
var sass            = require('gulp-sass');
var imagemin        = require('gulp-imagemin');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync').create();
var del             = require('del');

var paths = {
    views: 'app/**/*.html',
    styles: 'app/sass/**/*.scss',
    vendorStyles: 'app/css/*.css',
    scripts: [
        {
            dist: 'index.min.js',
            contains: [
                'app/js/jquery.main.js',
                'app/js/jquery.slider.js'
            ]
        },
        {
            dist: 'alvarez-case.min.js',
            contains: [
                'app/js/jquery.paralax.js',
                'app/js/jquery.example.js',
                'app/js/jquery.inner-paralax.js'
            ]
        },
        {
            dist: 'bobup-case.min.js',
            contains: [
                'app/js/jquery.bobup.js'
            ]
        },
        {
            dist: 'new-weinvest-case.min.js',
            contains: [
                'app/js/jquery.inner-paralax.js',
                'app/js/jquery.pic-example.js'
            ]
        },
        {
            dist: 'weinvest-case.min.js',
            contains: [
                'app/js/jquery.inner-paralax.js',
                'app/js/jquery.paralax.js'
            ]
        },
        {
            dist: 'oandb-case.min.js',
            contains: [
                'app/js/jquery.inner-paralax.js',
                'app/js/jquery.paralax.js',
                'app/js/jquery.slider.js'
            ]
        },
        {
            dist: 'contact.min.js',
            contains: [
                'app/js/jquery.inner-paralax.js'
            ]
        },
        {
            dist: 'launch-a-project.min.js',
            contains: [
                'app/js/jquery.inner-paralax.js',
                'app/js/jquery.select.js',
                'app/js/jquery.paralax.js'
            ]
        },
        {
            dist: 'showcase.min.js',
            contains: [
                'app/js/jquery.inner-paralax.js'
            ]
        },
        {
            dist: 'what-we-do.min.js',
            contains: [
                'app/js/jquery.example.js',
                'app/js/jquery.paralax.js',
                'app/js/jquery.inner-paralax.js'
            ]
        },
        {
            dist: 'who-we-are.min.js',
            contains: [
                'app/js/jquery.paralax.js',
                'app/js/jquery.gallery.js',
                'app/js/jquery.inner-paralax.js'
            ]
        }
    ],
    vendorScripts: 'app/js/vendors/**/*.js',
    watchScripts: 'app/js/**/*.js',
    images: 'app/img/**/*',
    pictures: 'app/pic/**/*',
    fonts: 'app/fonts/**/*',
    video: 'app/video/**/*'
};


gulp.task('clean', function (cb) {
    return del('dist', cb);
});

gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: 'dist'
    });
});

gulp.task('views', function () {
    return gulp.src(paths.views, {
            base: 'app'
        })
        .pipe(gulp.dest('dist'));
});

gulp.task('vendorScripts', function () {
    return gulp.src(paths.vendorScripts, {
        base: 'app/js/vendors'
    }).pipe(gulp.dest('dist/js/vendors'));
});

gulp.task('vendorStyles', function () {
    return gulp.src(paths.vendorStyles, {
        base: 'app/css'
    }).pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts, {
        base: 'app/fonts'
    }).pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task( 'scripts', function () {
    for ( var i = 0; i < paths.scripts.length; i++ ){
        gulp.src( paths.scripts[ i ].contains )
            .pipe(sourcemaps.init())
            // .pipe(babel({presets: ['es2015']})) //for js6
            .pipe(uglify())
            .pipe(concat(paths.scripts[ i ].dist))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/js/'));
    }
});

gulp.task('video', function() {
    return gulp.src(paths.video)
    // .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/video'));
});


gulp.task('images', function() {
    return gulp.src(paths.images)
        // .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('pictures', function() {
    return gulp.src(paths.pictures)
        // .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/pic'));
});

gulp.task('watch', function() {
    gulp.watch(paths.watchScripts,   ['scripts', browserSync.reload]);
    gulp.watch(paths.images,    ['images',  browserSync.reload]);
    gulp.watch(paths.pictures,    ['pictures',  browserSync.reload]);
    gulp.watch(paths.fonts,    ['fonts']);
    gulp.watch(paths.fonts,    ['video']);
    gulp.watch(paths.styles,    ['styles']);
    gulp.watch(paths.vendorStyles,    [ 'vendorStyles' ]);
    gulp.watch(paths.views,     ['views',   browserSync.reload]);
});

function serve() {
    return run( 'styles', 'scripts', 'vendorScripts', 'vendorStyles', 'fonts', 'video', 'images', 'pictures', 'views', 'serve');
}

gulp.task('default', ['clean'], serve());
