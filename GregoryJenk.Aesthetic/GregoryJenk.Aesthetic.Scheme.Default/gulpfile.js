/// <binding BeforeBuild="default" Clean="clean" />

var cleanCSS = require("gulp-clean-css");
var del = require("del");
var gulp = require("gulp");
var less = require("gulp-less");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

var paths = {
    lib: [
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/bootstrap/dist/js/bootstrap.min.js",
        "./node_modules/jquery/dist/jquery.slim.min.js",
        "./node_modules/popper.js/dist/umd/popper.min.js"
    ]
};

gulp.task("clean", function () {
    return del([
        "./dist/css",
        "./dist/js",
        "./lib"
    ]);
});

gulp.task("clean-css", function () {
    return del([
        "./dist/css"
    ]);
});

gulp.task("lib", function () {
    return gulp.src(paths.lib, { base: "node_modules" })
        .pipe(gulp.dest("./lib"));
});

gulp.task("less", function () {
    return gulp.src("./src/less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("min-css", function () {
    return gulp.src("./dist/css/**/*.css")
        //.pipe(sourcemaps.init())
        .pipe(cleanCSS())
        //.pipe(sourcemaps.write())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("watch-less", function () {
    return gulp.watch("./src/less/**/*", gulp.series("clean-css", "less", "min-css"));
});

gulp.task("default", gulp.series("clean", "lib", "less", "min-css"));