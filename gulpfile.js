var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	rigger = require('gulp-rigger'),
	sass = require('gulp-sass'),
	reload = browserSync.reload,
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	babel = require('gulp-babel');
    //uncss = require('gulp-uncss');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        port: 8080,
        open: true,
        notify: false
    });
});


//html
gulp.task('html', function () {
    gulp.src('src/*.html')
         .pipe(rigger())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});



///Migration of the version file

gulp.task('vision', function () {
    gulp.src('vision_buildnumber.properties')
        .pipe(gulp.dest('dist/'));

});


//css
gulp.task('css', function () {
    gulp.src('src/scss/**/*.*')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 5 version', 'ie 9'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});
//
// gulp.task('uncss', function () {
//     return gulp.src('dist/css')
//         .pipe(uncss({
//             html: ['index.html', 'posts/**/*.html']
//         }))
//         .pipe(gulp.dest('./out'));
// });


//img
gulp.task('img', function () {
    gulp.src('src/images/**/')
        .pipe(gulp.dest('dist/images'));
});


//js

gulp.task('js', function() {
    return gulp.src('src/js/**/*.*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});


//fonts
gulp.task('fonts', function () {
    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});




// clean
gulp.task('clean', function() {
    return del('dist');
});


// watch
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html', 'reload']);
    gulp.watch('src/template/*.html', ['html', 'reload']);
    gulp.watch('src/**/*.scss', ['css', 'reload']);
    gulp.watch('src/js/**', ['js', 'reload']);
    gulp.watch('src/imgages/**', ['img', 'reload']);
    gulp.watch('src/fonts/**', ['fonts','reload']);

    ///Migration of the version file
    gulp.watch('vision');
    browserSync.reload();
});

gulp.task('reload', function() {
    gulp.watch(['src/*.html', 'src/*.scss', 'public/*.js'],
        {cwd: ''},
        reload);
});

//default
gulp.task('default', [ 'browser-sync', 'css','html','img', 'js', 'fonts', 'watch','reload','vision']);

